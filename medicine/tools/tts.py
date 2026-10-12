#!/usr/bin/env python3
"""Read-aloud audio for the Medicine Atlas lessons, synthesised with Microsoft Edge's neural voices.

Run it with a Python that has edge-tts, beautifulsoup4 and html5lib (ffmpeg and ffprobe on the PATH):

    ~/.venvs/edge-tts/bin/python tools/tts.py                          # every lesson, both languages
    ~/.venvs/edge-tts/bin/python tools/tts.py --lang en blood          # one course in one language
    ~/.venvs/edge-tts/bin/python tools/tts.py --text blood/anaemia     # print the reading script only
    ~/.venvs/edge-tts/bin/python tools/tts.py --scan                   # list symbols the script leaves unread

For each written lesson it fetches the rendered page from the local web server and turns the lesson body
into a reading script: one segment per paragraph, list item, table row, heading, figure caption, block
heading and display formula, with formulas, units, ions and symbols written out as words. Each section is
synthesised in pieces small enough for one request, each piece is checked to have been read to its end (the
service sometimes closes a stream early without an error) and tried again if not, and the sections are joined
with a short pause into audio/<lang>/<course>/<chapter>.mp3.
Beside it, a .json gives the start time of every segment (by its index among the page's readable elements,
the same list assets/js/audio.js builds) and of every section, so the page can highlight the passage being
read. A lesson whose script and voice are unchanged is skipped, so re-running after edits redoes only what
changed. The audio is not kept in git (see /.gitignore): this tool regenerates it.
"""

import argparse
import asyncio
import hashlib
import html
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import time
import urllib.request
from pathlib import Path
from xml.sax.saxutils import escape as xml_escape

ROOT = Path(__file__).resolve().parent.parent
AUDIO = ROOT / 'audio'
VERSION = 1  # bump when the script rules change, to regenerate every lesson
VOICES = {'en': 'en-GB-SoniaNeural', 'zh': 'zh-CN-XiaoxiaoNeural'}
BASE = os.environ.get('ATLAS_BASE', 'http://127.0.0.1/learn/medicine/')
HOST = os.environ.get('ATLAS_HOST', 'f.g77k.com')
# The readable elements of a lesson, in document order. assets/js/audio.js uses the same selector and
# skips the same subtrees (figure stages, which scripts fill in), so element i here is element i there.
READABLE = 'p, li, h2, h3, h4, tr, figcaption, .blk-head, summary, .math-block'
GAP = 0.9  # seconds of silence before each section
BYTES_PER_SECOND = 6000  # the service sends constant-bitrate MP3, 48 kbit/s mono at 24 kHz, as bare frames
# Most text sent in one request, in bytes once XML-escaped. edge-tts splits longer text into several requests
# and only estimates where each starts, and a request the service ends early goes unnoticed; one request per
# piece keeps every word time exact and lets each piece be checked.
REQUEST = 4000


# ---------------------------------------------------------------------------------------------------------
# Words for symbols, units and formulas

GREEK = {
    'α': ('alpha', '阿尔法'), 'β': ('beta', '贝塔'), 'γ': ('gamma', '伽马'), 'δ': ('delta', '德尔塔'),
    'ε': ('epsilon', '艾普西隆'), 'ζ': ('zeta', '泽塔'), 'η': ('eta', '伊塔'), 'θ': ('theta', '西塔'),
    'ι': ('iota', '约塔'), 'κ': ('kappa', '卡帕'), 'λ': ('lambda', '兰姆达'), 'μ': ('mu', '缪'), 'ν': ('nu', '纽'),
    'ξ': ('xi', '克西'), 'π': ('pi', '派'), 'ρ': ('rho', '柔'), 'σ': ('sigma', '西格玛'), 'ς': ('sigma', '西格玛'),
    'τ': ('tau', '陶'), 'υ': ('upsilon', '宇普西隆'), 'φ': ('phi', '斐'), 'χ': ('chi', '卡伊'), 'ψ': ('psi', '普赛'),
    'ω': ('omega', '欧米伽'), 'Γ': ('gamma', '伽马'), 'Δ': ('delta', '德尔塔'), 'Θ': ('theta', '西塔'),
    'Λ': ('lambda', '兰姆达'), 'Σ': ('sigma', '西格玛'), 'Φ': ('phi', '斐'), 'Ψ': ('psi', '普赛'), 'Ω': ('omega', '欧米伽'),
}
TEX_GREEK = {'alpha': 'α', 'beta': 'β', 'gamma': 'γ', 'delta': 'δ', 'epsilon': 'ε', 'varepsilon': 'ε', 'zeta': 'ζ',
             'eta': 'η', 'theta': 'θ', 'kappa': 'κ', 'lambda': 'λ', 'mu': 'μ', 'nu': 'ν', 'xi': 'ξ', 'pi': 'π',
             'rho': 'ρ', 'sigma': 'σ', 'tau': 'τ', 'phi': 'φ', 'varphi': 'φ', 'chi': 'χ', 'psi': 'ψ', 'omega': 'ω',
             'Gamma': 'Γ', 'Delta': 'Δ', 'Theta': 'Θ', 'Lambda': 'Λ', 'Sigma': 'Σ', 'Phi': 'Φ', 'Psi': 'Ψ', 'Omega': 'Ω'}

SUP = str.maketrans('⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻', '0123456789+-')
SUB = str.maketrans('₀₁₂₃₄₅₆₇₈₉₊₋ₐₑₒₓₙᵢⱼₖₘₚₛₜ', '0123456789+-aeoxnijkmpst')
SUPD = '⁰¹²³⁴⁵⁶⁷⁸⁹'

# Gas and blood-gas labels are read letter by letter, as clinicians say them.
SPELLED = ['PaCO₂', 'PaO₂', 'PAO₂', 'PACO₂', 'PvO₂', 'PvCO₂', 'PetCO₂', 'pCO₂', 'PCO₂', 'pO₂', 'PO₂', 'PIO₂',
           'PiO₂', 'FiO₂', 'FIO₂', 'SpO₂', 'SaO₂', 'ScvO₂', 'SvO₂', 'VO₂max', 'VO₂', 'VCO₂', 'DO₂', 'CaO₂',
           'CvO₂', 'FEV₁', 'FADH₂', 'HbA₂', 'HbA₁c', 'HbA1c', 'NADH', 'NADPH']
CHEM = {  # (English, Chinese); longest keys are replaced first
    'HCO₃⁻': ('bicarbonate', '碳酸氢根'), 'HCO₃': ('bicarbonate', '碳酸氢根'), 'H₂CO₃': ('carbonic acid', '碳酸'),
    'Na⁺': ('sodium', '钠离子'), 'K⁺': ('potassium', '钾离子'), 'Ca²⁺': ('calcium', '钙离子'), 'Mg²⁺': ('magnesium', '镁离子'),
    'Cl⁻': ('chloride', '氯离子'), 'H⁺': ('hydrogen ion', '氢离子'), 'NH₄⁺': ('ammonium', '铵离子'), 'NH₄': ('ammonium', '铵'),
    'NH₃': ('ammonia', '氨'), 'Fe²⁺': ('ferrous iron', '亚铁离子'), 'Fe³⁺': ('ferric iron', '三价铁离子'),
    'Zn²⁺': ('zinc', '锌离子'), 'Cu²⁺': ('copper', '铜离子'), 'Li⁺': ('lithium', '锂离子'), 'OH⁻': ('hydroxide', '氢氧根'),
    'PO₄³⁻': ('phosphate', '磷酸根'), 'HPO₄²⁻': ('hydrogen phosphate', '磷酸氢根'), 'H₂PO₄⁻': ('dihydrogen phosphate', '磷酸二氢根'),
    'SO₄²⁻': ('sulphate', '硫酸根'), 'I⁻': ('iodide', '碘离子'), 'NAD⁺': ('N A D plus', 'NAD正'), 'NADP⁺': ('N A D P plus', 'NADP正'),
    'H₂O₂': ('hydrogen peroxide', '过氧化氢'), 'H₂O': ('water', '水'), 'N₂O': ('nitrous oxide', '一氧化二氮'),
    'CO₂': ('C O 2', '二氧化碳'), 'O₂': ('O 2', '氧'), 'N₂': ('nitrogen', '氮气'), 'H₂S': ('hydrogen sulphide', '硫化氢'),
    'CH₄': ('methane', '甲烷'), 'β⁰': ('beta zero', '贝塔零'), 'β⁺': ('beta plus', '贝塔加'),
}
ELEMENTS = {'Tc': ('technetium', '锝'), 'Cr': ('chromium', '铬'), 'I': ('iodine', '碘'), 'C': ('carbon', '碳'),
            'F': ('fluorine', '氟'), 'Ga': ('gallium', '镓'), 'In': ('indium', '铟'), 'Tl': ('thallium', '铊'),
            'Rb': ('rubidium', '铷'), 'N': ('nitrogen', '氮'), 'O': ('oxygen', '氧'), 'P': ('phosphorus', '磷'),
            'Sr': ('strontium', '锶'), 'Y': ('yttrium', '钇'), 'Ra': ('radium', '镭'), 'Lu': ('lutetium', '镥'),
            'Xe': ('xenon', '氙'), 'Kr': ('krypton', '氪'), 'H': ('hydrogen', '氢'), 'Co': ('cobalt', '钴'),
            'Sm': ('samarium', '钐'), 'Fe': ('iron', '铁'), 'K': ('potassium', '钾'), 'Na': ('sodium', '钠')}

# unit: (English singular, English plural, Chinese)
UNITS = {
    'mol': ('mole', 'moles', '摩尔'), 'mmol': ('millimole', 'millimoles', '毫摩尔'), 'µmol': ('micromole', 'micromoles', '微摩尔'),
    'nmol': ('nanomole', 'nanomoles', '纳摩尔'), 'pmol': ('picomole', 'picomoles', '皮摩尔'),
    'g': ('gram', 'grams', '克'), 'kg': ('kilogram', 'kilograms', '千克'), 'mg': ('milligram', 'milligrams', '毫克'),
    'µg': ('microgram', 'micrograms', '微克'), 'mcg': ('microgram', 'micrograms', '微克'), 'ng': ('nanogram', 'nanograms', '纳克'),
    'pg': ('picogram', 'picograms', '皮克'),
    'L': ('litre', 'litres', '升'), 'l': ('litre', 'litres', '升'), 'dL': ('decilitre', 'decilitres', '分升'),
    'mL': ('millilitre', 'millilitres', '毫升'), 'ml': ('millilitre', 'millilitres', '毫升'), 'µL': ('microlitre', 'microlitres', '微升'),
    'fL': ('femtolitre', 'femtolitres', '飞升'), 'nL': ('nanolitre', 'nanolitres', '纳升'),
    'mmHg': ('millimetre of mercury', 'millimetres of mercury', '毫米汞柱'), 'cmH₂O': ('centimetre of water', 'centimetres of water', '厘米水柱'),
    'cmH2O': ('centimetre of water', 'centimetres of water', '厘米水柱'), 'kPa': ('kilopascal', 'kilopascals', '千帕'),
    'Pa': ('pascal', 'pascals', '帕'), 'atm': ('atmosphere', 'atmospheres', '个大气压'),
    'mOsm': ('milliosmole', 'milliosmoles', '毫渗量'), 'Osm': ('osmole', 'osmoles', '渗量'),
    'mEq': ('milliequivalent', 'milliequivalents', '毫当量'), 'IU': ('international unit', 'international units', '国际单位'),
    'mIU': ('milli-international unit', 'milli-international units', '毫国际单位'), 'U': ('unit', 'units', '单位'),
    'mU': ('milliunit', 'milliunits', '毫单位'), 'kU': ('kilounit', 'kilounits', '千单位'),
    'kcal': ('kilocalorie', 'kilocalories', '千卡'), 'cal': ('calorie', 'calories', '卡'), 'kJ': ('kilojoule', 'kilojoules', '千焦'),
    'J': ('joule', 'joules', '焦耳'), 'W': ('watt', 'watts', '瓦'), 'mV': ('millivolt', 'millivolts', '毫伏'), 'V': ('volt', 'volts', '伏'),
    'µV': ('microvolt', 'microvolts', '微伏'), 'mA': ('milliamp', 'milliamps', '毫安'), 'Hz': ('hertz', 'hertz', '赫兹'),
    'kHz': ('kilohertz', 'kilohertz', '千赫'), 'MHz': ('megahertz', 'megahertz', '兆赫'), 'dB': ('decibel', 'decibels', '分贝'),
    'Gy': ('gray', 'gray', '戈瑞'), 'cGy': ('centigray', 'centigray', '厘戈瑞'), 'mSv': ('millisievert', 'millisieverts', '毫希沃特'),
    'Sv': ('sievert', 'sieverts', '希沃特'), 'Bq': ('becquerel', 'becquerels', '贝可勒尔'), 'MBq': ('megabecquerel', 'megabecquerels', '兆贝可'),
    'm': ('metre', 'metres', '米'), 'cm': ('centimetre', 'centimetres', '厘米'), 'mm': ('millimetre', 'millimetres', '毫米'),
    'µm': ('micrometre', 'micrometres', '微米'), 'nm': ('nanometre', 'nanometres', '纳米'), 'km': ('kilometre', 'kilometres', '千米'),
    's': ('second', 'seconds', '秒'), 'ms': ('millisecond', 'milliseconds', '毫秒'), 'min': ('minute', 'minutes', '分钟'),
    'h': ('hour', 'hours', '小时'), 'hr': ('hour', 'hours', '小时'), 'hour': ('hour', 'hours', '小时'), 'day': ('day', 'days', '天'),
    'd': ('day', 'days', '天'), 'week': ('week', 'weeks', '周'), 'wk': ('week', 'weeks', '周'), 'year': ('year', 'years', '年'),
    'yr': ('year', 'years', '年'), 'mo': ('month', 'months', '个月'), 'month': ('month', 'months', '个月'),
    'bpm': ('beat per minute', 'beats per minute', '次每分钟'), 'cells': ('cell', 'cells', '个细胞'),
    'copies': ('copy', 'copies', '拷贝'), 'kb': ('kilobase', 'kilobases', '千碱基'), 'Mb': ('megabase', 'megabases', '兆碱基'),
    'kDa': ('kilodalton', 'kilodaltons', '千道尔顿'), 'Da': ('dalton', 'daltons', '道尔顿'), 'M': ('molar', 'molar', '摩尔每升'),
    'mM': ('millimolar', 'millimolar', '毫摩尔每升'), 'µM': ('micromolar', 'micromolar', '微摩尔每升'), 'nM': ('nanomolar', 'nanomolar', '纳摩尔每升'),
}
# units that are never ordinary words, so they are read even without a number before them
STANDALONE = {'mmol', 'µmol', 'nmol', 'pmol', 'mg', 'µg', 'mcg', 'ng', 'pg', 'dL', 'mL', 'µL', 'fL', 'mmHg', 'cmH₂O', 'cmH2O',
              'kPa', 'mOsm', 'mEq', 'mIU', 'kcal', 'kJ', 'mV', 'µm', 'nm', 'mSv', 'kDa', 'bpm', 'cGy', 'MBq', 'µV', 'kHz', 'mM', 'µM'}


def unit_words(expr, lang, number=None):
    """'mmol/L' → 'millimoles per litre'; None if expr is not made of known units."""
    parts = expr.split('/')
    out = []
    for i, p in enumerate(parts):
        power = ''
        if p and p[-1] in '²³':
            power, p = p[-1], p[:-1]
        if p not in UNITS:
            return None
        sg, pl, zh = UNITS[p]
        if lang == 'zh':
            w = ('平方' if power == '²' else '立方' if power == '³' else '') + zh
            out.append(w if i == 0 else '每' + w)
        else:
            w = sg if (i > 0 or number == '1') else pl
            w = ('square ' if power == '²' else 'cubic ' if power == '³' else '') + w
            out.append(w if i == 0 else 'per ' + w)
    return ''.join(out) if lang == 'zh' else ' '.join(out)


UNIT_TOKEN = r'(?:' + '|'.join(sorted((re.escape(u) for u in UNITS), key=len, reverse=True)) + r')[²³]?'
UNIT_EXPR = re.compile(r'(?<![A-Za-z/])(' + UNIT_TOKEN + r'(?:/' + UNIT_TOKEN + r')*)(?![A-Za-z0-9/²³])')
NUM = r'\d+(?:[.,]\d+)*'


def norm(s, lang):
    """Turn displayed text into text a voice reads correctly."""
    zh = lang == 'zh'
    L = 1 if zh else 0
    s = re.sub('[​‌‍⁠⁡­﻿●○∎■‡†]', '', s)
    s = re.sub('[    　]', ' ', s)
    s = re.sub('μ(?=[A-Za-z])', 'µ', s)  # Greek mu before a unit is the micro sign: μg, μmol/L
    s = s.replace('∆', 'Δ')
    s = s.replace('𧿹', '拇')  # the anatomists' hallux character (mǔ), missing from most voices
    s = re.sub(r'\{\{?[#.]?[\w -]*\}?\}', '', s)  # an attribute that failed to parse: {#id}, {{level-1}}
    s = re.sub(r'(?<=[A-Z0-9])\\?\*(\d+):(\d+)', r' \1 \2', s)  # HLA-B*57:01
    s = re.sub(r'(?<![A-Za-z0-9])\\?\*(\d+)', r' 星\1' if zh else r' star \1', s)  # CYP2C19 *2
    s = s.replace('\\', '')
    s = re.sub(r'(?<=\w)_(?=\w)', ' ', s).replace('^', ' ')
    s = re.sub(r'(?<![A-Za-z0-9])CD(\d+[a-z]?)\+(?!\+)', lambda m: f"CD{m.group(1)}{'阳性' if zh else ' positive'}", s)
    s = s.replace('＋', '+').replace('＝', '=').replace('／', '/').replace('～', '~').replace('℃', '°C')
    s = re.sub(r'(?<=\d),(?=\d{3}\b)', '', s)  # 10,000 → 10000
    s = re.sub(r'(?<=\d) (?=\d{3}\b)', '', s)  # 10 000 → 10000
    s = re.sub(r'mL/min/1\.73\s?m²', 'mL/min每1.73 m²' if zh else 'mL/min per 1.73 m²', s)
    # ions and gases, and a slash between two of them ("Na⁺/K⁺-ATPase")
    s = re.sub(r'([⁺⁻])/(?=[A-Z])', r'\1 ', s)
    for k in sorted(CHEM, key=len, reverse=True):
        s = re.sub(r'(?<![A-Za-z0-9])' + re.escape(k) + r'(?![A-Za-z0-9₀-₉⁰-⁹⁺⁻])', ' ' + CHEM[k][L] + ' ', s)
    for k in SPELLED:
        plain = k.translate(SUB)
        # letter by letter, in capitals so that a lone "a" is not read as the article (and the Chinese voice
        # does not read PaCO2 as a syllable): P A C O 2; a pause before a value that follows it
        spoken = ' '.join(re.findall(r'max|\d+|[A-Za-z]', plain)).upper().replace('MAX', 'max')
        for form in {k, plain}:
            s = re.sub(r'(?<![A-Za-z0-9])' + re.escape(form) + r'(?![A-Za-z0-9])(\s*)(?=(\d)?)',
                       lambda m: f" {spoken}{('，' if zh else ', ') if m.group(2) else ' '}", s)
    s = re.sub(r'(?<![A-Za-z0-9])CD(\d+[a-z]?)⁺', lambda m: f"CD{m.group(1)}{'阳性' if zh else ' positive'}", s)
    s = re.sub(r'(?<![A-Za-z0-9])CD(\d+[a-z]?)⁻', lambda m: f"CD{m.group(1)}{'阴性' if zh else ' negative'}", s)
    if not zh:
        s = re.sub(r'(?<![A-Za-z])Hb(?=\s*(?:of\s+)?\d)', 'haemoglobin', s)
        s = re.sub(r'(?<![A-Za-z])Hb(?![A-Za-z0-9₀-₉])', 'H B', s)
        s = re.sub(r'(?<![A-Za-z])Hb([A-Z][A-Za-z0-9₀-₉]{0,2})(?![A-Za-z])', lambda m: 'H B ' + ' '.join(m.group(1).translate(SUB)), s)
    s = re.sub(r'([⁰¹²³⁴⁵⁶⁷⁸⁹])\s*–\s*(?=\d)', r'\1至' if zh else r'\1 to ', s)  # 10⁶–10¹²
    # powers of ten, squares and other powers
    s = re.sub(r'10([⁻⁺]?)([' + SUPD + r']+)/(' + UNIT_TOKEN + r')(?![A-Za-z0-9/])', lambda m: (
        f"10的{'负' if m.group(1) == '⁻' else ''}{m.group(2).translate(SUP)}次方每{unit_words(m.group(3), lang, '1')}" if zh else
        f"10 to the {'minus ' if m.group(1) == '⁻' else ''}{m.group(2).translate(SUP)} per {unit_words(m.group(3), lang, '1')}"), s)
    s = re.sub(r'10([⁻⁺]?)([' + SUPD + ']+)', lambda m: (f"10的{'负' if m.group(1) == '⁻' else ''}{m.group(2).translate(SUP)}次方" if zh
               else f"10 to the {'minus ' if m.group(1) == '⁻' else ''}{m.group(2).translate(SUP)}"), s)
    s = re.sub(r'(?<=\d)/(' + UNIT_TOKEN + r')(?![\w/])', lambda m: (' per ' if not zh else '每') + unit_words(m.group(1), lang, '1'), s)
    s = UNIT_EXPR.sub(lambda m: unit_or_same(m, s, lang), s)
    # isotopes: ⁵¹Cr → chromium 51, ⁹⁹ᵐTc → technetium 99m
    s = re.sub(r'([⁰¹²³⁴⁵⁶⁷⁸⁹]+)(ᵐ?)(' + '|'.join(sorted(ELEMENTS, key=len, reverse=True)) + r')(?![a-z])',
               lambda m: f" {ELEMENTS[m.group(3)][L]} {m.group(1).translate(SUP)}{'m' if m.group(2) else ''} ", s)
    s = re.sub(r'(?<=[A-Za-z)\]])([²³])', lambda m: ('的平方' if m.group(1) == '²' else '的立方') if zh
               else (' squared' if m.group(1) == '²' else ' cubed'), s)
    s = re.sub(r'(?<=[A-Za-z)\]])([⁻]?[' + SUPD + ']+)', lambda m: (f"的{m.group(1).translate(SUP).replace('-', '负')}次方" if zh
               else f" to the power of {m.group(1).translate(SUP).replace('-', 'minus ')}"), s)
    s = re.sub(r'(?<=[A-Za-z0-9)\]])⁺', '正' if zh else ' plus', s)
    s = re.sub(r'(?<=[A-Za-z0-9)\]])⁻', '负' if zh else ' minus', s)
    s = s.translate(SUB).translate(SUP)
    # numbers with signs, ranges and comparisons
    s = re.sub(r'(?<![A-Za-z0-9)\]])[−](?=\d)', '负' if zh else 'minus ', s)
    s = re.sub(r'(?<![A-Za-z0-9)\]])-(?=\d)', '负' if zh else 'minus ', s)
    s = re.sub(r'(' + NUM + r'%?)\s*[–~](?=\s*-?\d)', r'\1至' if zh else r'\1 to ', s)
    s = re.sub(r'(?<![\w.-])(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)(?![\w-])', r'\1至\2' if zh else r'\1 to \2', s)
    s = re.sub(r'(?<![A-Za-z0-9])[~∼≈]\s*(?=[-−]?\d)', '约' if zh else 'roughly ', s)
    s = re.sub(r'[~∼]\s*', '约' if zh else 'roughly ', s)
    s = s.replace('−', '-')
    s = s.replace('–', ' ').replace('—', '，' if zh else ', ')
    rep = {'≈': ('approximately', '约等于'), '≥': ('at least', '大于等于'), '≤': ('at most', '小于等于'),
           '>': ('more than', '大于'), '<': ('less than', '小于'), '±': ('plus or minus', '正负'), '×': ('times', '乘以'),
           '÷': ('divided by', '除以'), '→': ('to', '到'), '⟶': ('to', '到'), '←': ('from', '来自'), '↑': ('raised', '升高'),
           '↓': ('reduced', '降低'), '↔': ('and', '与'), '⇒': (', so', '，因此'), '⟹': (', so', '，因此'), '⇌': ('in equilibrium with', '可逆转化为'),
           '∝': ('proportional to', '正比于'), '≫': ('much greater than', '远大于'), '≪': ('much less than', '远小于'),
           '≠': ('not equal to', '不等于'), '=': ('equals', '等于'), '″': ('double prime', '两撇'), '′': ('prime', '撇'), '&': ('and', '和'),
           '√': ('the square root of', '根号'), '∑': ('the sum of', '求和'), '∘': ('', '')}
    for k, v in rep.items():
        s = s.replace(k, f' {v[L]} ')
    s = re.sub(r'(?<=[A-Za-z])°′', '标准' if zh else ' naught prime', s)  # ΔG°′
    s = re.sub(r'(?<=[A-Za-z])°', '标准' if zh else ' naught', s)
    s = re.sub(r'(\d)\s*°C(?![A-Za-z])', r'\1 ' + ('摄氏度' if zh else 'degrees Celsius'), s)
    s = re.sub(r'(\d)\s*°F(?![A-Za-z])', r'\1 ' + ('华氏度' if zh else 'degrees Fahrenheit'), s)
    s = s.replace('°', '度' if zh else ' degrees')
    # Greek letters and the micro sign left over
    s = re.sub('[α-ωΑ-Ως]', lambda m: greek(m, L), s)
    s = s.replace('µ', '微' if zh else 'micro')
    for i, r in enumerate('ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ'):
        s = s.replace(r, '一二三四五六七八九十'[i] if zh else ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][i])
    # slashes left: fractions, ratios and alternatives
    s = re.sub(r'(?<!\d)(?<!\d\.)(\d+(?:\.\d+)?)/(\d+(?:\.\d+)?)(?!\d|\.\d)', lambda m: fraction(m.group(1), m.group(2), zh), s)
    s = re.sub(r'(?<![A-Za-z])V/Q(?![A-Za-z])', 'V Q', s)
    s = re.sub(r'\band/or\b', 'and or', s)
    s = re.sub(r'\s*/\s*', '或' if zh else ' or ', s)
    if not zh:
        s = re.sub(r'\be\.g\.,?', 'for example,', s)
        s = re.sub(r'\bi\.e\.,?', 'that is,', s)
        s = re.sub(r'\bvs\.?(?=\s)', 'versus', s)
        s = re.sub(r'\bcf\.', 'compare', s)
        s = re.sub(r'\betc\.', 'et cetera.', s)
        s = re.sub(r'\bapprox\.', 'approximately', s)
        s = re.sub(r'\bc\.\s(?=\d{3,4}\b)', 'around ', s)
        s = re.sub(r'\bNo\.\s?(?=\d)', 'number ', s)
    s = s.replace('[', ' ').replace(']', ' ')
    s = re.sub(r'\s-(?=[A-Za-z])', ' ', s)  # "sodium potassium -ATPase"
    s = re.sub(r'\s+', ' ', s).strip()
    s = re.sub(r'\s+([,.;:!?)\]，。；：！？、）])', r'\1', s)
    s = re.sub(r'([(\[（])\s+', r'\1', s)
    s = re.sub(r'[,，]\s*([,.;:，。；：])', r'\1', s)
    if zh:
        s = re.sub(r'(?<=[㐀-鿿，。；：、（）“”])\s+|\s+(?=[㐀-鿿，。；：、（）“”])', '', s)
    return s


ORDINAL = {3: 'third', 4: 'quarter', 5: 'fifth', 6: 'sixth', 7: 'seventh', 8: 'eighth', 9: 'ninth', 10: 'tenth',
           11: 'eleventh', 12: 'twelfth', 16: 'sixteenth', 20: 'twentieth', 100: 'hundredth'}


def fraction(a, b, zh):
    """'2/3' as it is said: two thirds, 三分之二 (never a date); 120/80 as 120 over 80."""
    whole = '.' not in a + b
    if zh:
        if not whole:
            return f'{a}除以{b}'
        return f'{b}分之{a}' if int(a) < int(b) <= 1000 else f'{a}比{b}'
    if whole and int(a) < int(b):
        n, d = int(a), int(b)
        if d == 2:
            return f"{n} {'half' if n == 1 else 'halves'}"
        if d in ORDINAL:
            return f"{n} {ORDINAL[d]}{'' if n == 1 else 's'}"
    return f'{a} over {b}'


def greek(m, L):
    s, a, b = m.string, m.start(), m.end()
    name = GREEK.get(m.group(0), (m.group(0), m.group(0)))[L]
    left = ' ' if a > 0 and (s[a - 1].isalnum() or s[a - 1] in GREEK) else ''
    right = ' ' if b < len(s) and (s[b].isalnum() or s[b] in GREEK) else ''
    return left + name + right


def unit_or_same(m, s, lang):
    expr = m.group(1)
    before = s[:m.start()]
    num = re.search(r'(' + NUM + r')\s?$', before)
    after_number = num is not None
    if not after_number:
        base = expr.split('/')[0].rstrip('²³')
        if '/' not in expr and base not in STANDALONE:
            return expr
        if '/' in expr and not all(p.rstrip('²³') in UNITS and (len(p.rstrip('²³')) > 1 or p.rstrip('²³') in 'Lgm') for p in expr.split('/')):
            return expr  # "A/B": letters, not units
        if '/' in expr and re.search(r'[A-Za-z]$', before):
            return expr
    w = unit_words(expr, lang, num.group(1) if num else None)
    if w is None:
        return expr
    return (w if lang == 'zh' else ' ' + w + ' ')


# ---------------------------------------------------------------------------------------------------------
# TeX formulas read aloud

class Tex:
    """A small reader for the TeX the lessons use: fractions, powers, subscripts, roots, concentrations,
    Greek letters, operators and \\text. Produces text that norm() then finishes."""

    OPS = {'=': ('equals', '等于'), '+': ('plus', '加'), '<': ('is less than', '小于'), '>': ('is greater than', '大于'),
           '\\times': ('times', '乘以'), '\\cdot': ('times', '乘以'), '\\div': ('divided by', '除以'),
           '\\approx': ('is approximately', '约等于'), '\\sim': ('is about', '约为'), '\\le': ('is at most', '小于等于'),
           '\\leq': ('is at most', '小于等于'), '\\ge': ('is at least', '大于等于'), '\\geq': ('is at least', '大于等于'),
           '\\ne': ('is not equal to', '不等于'), '\\neq': ('is not equal to', '不等于'), '\\pm': ('plus or minus', '正负'),
           '\\gg': ('is much greater than', '远大于'), '\\ll': ('is much less than', '远小于'),
           '\\propto': ('is proportional to', '正比于'), '\\to': ('gives', '生成'), '\\rightarrow': ('gives', '生成'),
           '\\longrightarrow': ('gives', '生成'), '\\Rightarrow': (', so', '，因此'), '\\Longrightarrow': (', so', '，因此'),
           '\\implies': (', so', '，因此'), '\\rightleftharpoons': ('is in equilibrium with', '可逆生成'),
           '\\leftrightarrow': ('and', '与'), '\\mid': ('given', '给定'), '\\infty': ('infinity', '无穷大'),
           '\\sum': ('the sum of', '求和'), '\\dots': ('and so on', '等等'), '\\ldots': ('and so on', '等等'),
           '\\cdots': ('and so on', '等等'), '\\%': ('%', '%'), '\\partial': ('partial', '偏'), ',': (',', '，'),
           ';': (';', '；'), ':': ('to', '比'), '!': ('factorial', '的阶乘')}
    FUNCS = {'\\log': ('log', '对数'), '\\ln': ('the natural log of', '自然对数'), '\\exp': ('the exponential of', '指数'),
             '\\max': ('max', 'max'), '\\min': ('min', 'min'), '\\sin': ('sine', '正弦'), '\\cos': ('cosine', '余弦'),
             '\\tan': ('tangent', '正切'), '\\lim': ('the limit', '极限'), '\\Pr': ('the probability', '概率')}
    SPACE = {'\\,', '\\;', '\\:', '\\!', '\\ ', '\\quad', '\\qquad', '\\left', '\\right', '\\big', '\\Big', '\\bigl',
             '\\bigr', '\\displaystyle', '\\textstyle', '\\blacksquare', '\\nolimits', '\\limits', '&', '\\\\'}
    TEXTS = {'\\text', '\\mathrm', '\\textrm', '\\mathit', '\\mathbf', '\\textbf', '\\operatorname', '\\mathsf', '\\textit', '\\mbox'}
    FRACS = {'\\frac', '\\dfrac', '\\tfrac'}

    def __init__(self, tex, lang):
        self.zh = lang == 'zh'
        self.L = 1 if self.zh else 0
        self.lang = lang
        tex = tex.replace('{,}', '').replace('\\!', '')
        self.toks = re.findall(r'\\[A-Za-z]+|\\.|\d+(?:\.\d+)?|\s+|.', tex, re.S)
        self.i = 0
        self.unknown = []

    def peek(self):
        while self.i < len(self.toks) and self.toks[self.i].isspace():
            self.i += 1
        return self.toks[self.i] if self.i < len(self.toks) else None

    def take(self):
        t = self.peek()
        self.i += 1
        return t

    def raw_group(self):
        """The raw contents of a {…} group (for \\text)."""
        if self.peek() != '{':
            return self.take() or ''
        self.take()
        depth, out = 1, []
        while self.i < len(self.toks):
            t = self.toks[self.i]
            self.i += 1
            if t == '{':
                depth += 1
            elif t == '}':
                depth -= 1
                if depth == 0:
                    break
            out.append(t)
        return ''.join(out)

    def arg(self):
        """One argument: a {group} or a single token, as a list of nodes."""
        if self.peek() == '{':
            self.take()
            return self.seq('}')
        t = self.peek()
        if t is None:
            return []
        return [self.atom()]

    def seq(self, stop=None):
        nodes = []
        while True:
            t = self.peek()
            if t is None:
                break
            if t == stop:
                self.take()
                break
            if t == '}':
                self.take()
                continue
            if t in ('^', '_'):
                self.take()
                base = nodes.pop() if nodes else ('text', '')
                sub = sup = None
                if t == '_':
                    sub = self.arg()
                    if self.peek() == '^':
                        self.take()
                        sup = self.arg()
                else:
                    sup = self.arg()
                    if self.peek() == '_':
                        self.take()
                        sub = self.arg()
                nodes.append(('script', base, sub, sup))
                continue
            nodes.append(self.atom())
        return nodes

    def atom(self):
        t = self.take()
        if t == '{':
            return ('group', self.seq('}'))
        if t == '[':
            inner = self.seq(']')
            return ('conc', inner)
        if t in self.TEXTS:
            return ('text', self.raw_group())
        if t in self.FRACS:
            return ('frac', self.arg(), self.arg())
        if t == '\\sqrt':
            if self.peek() == '[':
                self.take()
                self.seq(']')
            return ('sqrt', self.arg())
        if t in ('\\overline', '\\bar', '\\hat', '\\tilde', '\\vec', '\\dot'):
            word = {'\\overline': ('bar', '均值'), '\\bar': ('bar', '均值'), '\\hat': ('hat', '估计'),
                    '\\tilde': ('tilde', '波浪'), '\\vec': ('vector', '向量'), '\\dot': ('dot', '导数')}[t][self.L]
            return ('post', self.arg(), word)
        if t == '\\dd':
            return ('id', 'd')
        if t == '\\mu' and self.peek() in self.TEXTS:
            j = self.i
            self.take()
            unit = self.raw_group()
            if '\u00b5' + unit in UNITS:
                return ('text', '\u00b5' + unit)
            self.i = j
        if t[1:] in TEX_GREEK if t.startswith('\\') else False:
            return ('id', TEX_GREEK[t[1:]])
        if t in self.FUNCS:
            return ('fn', t)
        if t in self.OPS:
            return ('op', t)
        if t in self.SPACE:
            return ('space',)
        if t in ('\\circ',):
            return ('id', '°')
        if t in ('\\prime',):
            return ('id', '′')
        if t in ('\\{', '\\}', '\\langle', '\\rangle', '\\lvert', '\\rvert', '|'):
            return ('space',)
        if t in ('(', ')'):
            return ('paren', t)
        if t == '-':
            return ('minus',)
        if t == '/':
            return ('slash',)
        if t == "'":
            return ('id', '′')
        if t.startswith('\\'):
            self.unknown.append(t)
            return ('space',)
        if re.fullmatch(r'\d+(?:\.\d+)?', t):
            return ('num', t)
        return ('id', t)

    # -- speaking

    def kind(self, n):
        return n[0] if n else None

    def say(self, nodes):
        out = []
        prev = None
        for n in nodes:
            k = n[0]
            if k == 'space':
                out.append(' ')
                continue
            # implicit multiplication: 2(…), 2[Na⁺], [E][S]
            is_conc = k == 'conc' or (k == 'script' and n[1][0] == 'conc')
            if prev in ('num', 'id', 'conc', 'close', 'script', 'frac') and (is_conc or (k == 'paren' and n[1] == '(')):
                out.append(' ' + ('乘以' if self.zh else 'times') + ' ')
            if k == 'minus':
                unary = prev in (None, 'op', 'open', 'minus', 'slash', 'fn')
                out.append(' ' + ('负' if self.zh else 'minus') + ' ' if unary else ' ' + ('减' if self.zh else 'minus') + ' ')
                prev = 'minus'
                continue
            if k == 'slash':
                out.append('\x00')  # "over", unless between two numbers (resolved below)
                prev = 'slash'
                continue
            if k == 'paren':
                out.append(' ' if n[1] == '(' else ' ')
                prev = 'open' if n[1] == '(' else 'close'
                continue
            out.append(self.say_node(n))
            prev = 'fn' if k == 'fn' or (k == 'script' and n[1][0] == 'fn') else k
        s = re.sub(r'(?<=\d)\s*\x00\s*(?=\d)', '/', ''.join(out))
        s = s.replace('\x00', ' 除以 ' if self.zh else ' over ')
        return re.sub(r'\s+', ' ', s).strip()

    def flat(self, nodes):
        """Plain text of simple nodes (numbers, letters, \\text), or None if they are not simple."""
        s = ''
        for n in nodes:
            if n[0] in ('num', 'id', 'text'):
                s += n[1]
            elif n[0] == 'group':
                f = self.flat(n[1])
                if f is None:
                    return None
                s += f
            elif n[0] == 'minus':
                s += '-'
            elif n[0] == 'space':
                s += ''
            elif n[0] == 'op' and n[1] == '\\%':
                s += '%'
            elif n[0] == 'op' and n[1] in ('+',):
                s += '+'
            else:
                return None
        return s

    def say_node(self, n):
        k = n[0]
        zh, L = self.zh, self.L
        if k == 'num':
            return n[1]
        if k == 'id':
            return ' ' + n[1] + ' '
        if k == 'text':
            return ' ' + n[1] + ' '
        if k == 'group':
            return ' ' + self.say(n[1]) + ' '
        if k == 'op':
            w = self.OPS[n[1]][L]
            return w if n[1] in ('\\%', ',', ';') else ' ' + w + ' '
        if k == 'fn':
            return ' ' + self.FUNCS[n[1]][L] + ' '
        if k == 'conc':
            inner = self.say(n[1])
            return f' {inner}的浓度 ' if zh else f' the concentration of {inner} '
        if k == 'post':
            return f' {self.say(n[1])} {n[2]} '
        if k == 'sqrt':
            inner = self.say(n[1])
            return f' 根号{inner} ' if zh else f' the square root of {inner} '
        if k == 'frac':
            a, b = self.say(n[1]), self.say(n[2])
            fa, fb = self.flat(n[1]), self.flat(n[2])
            if fa == 'd' and fb and fb.startswith('d'):
                return f' 对{fb[1:]}求导 ' if zh else f' the rate of change with respect to {fb[1:]} of '
            if fa and fb and re.fullmatch(r'\d+', fa) and re.fullmatch(r'\d+', fb):
                return f' {fb}分之{fa} ' if zh else f' {fa}/{fb} '
            if zh:
                return f' {b}分之{a} '
            simple = ' ' not in a.strip() and ' ' not in b.strip()
            return f' {a} over {b} ' if simple else f' {a}, over {b}, '
        if k == 'script':
            _, base, sub, sup = n
            fbase = self.flat([base]) if base[0] != 'conc' else None
            b = self.say([base])
            if base[0] == 'fn' and base[1] == '\\log' and sub:
                s = self.say(sub)
                return f' 以{s}为底的对数 ' if zh else f' log base {s} of '
            if sub:
                s = self.say(sub)
                if base[0] == 'conc':
                    inner = self.say(base[1])
                    b = f' {inner} {s} 的浓度 ' if zh else f' the concentration of {inner} {s} '
                else:
                    b = f' {b} {s} '
            if sup:
                e = self.flat(sup)
                raw = ''.join(t[1] if len(t) > 1 and isinstance(t[1], str) else '' for t in sup)
                if fbase and re.fullmatch(r'[A-Z][a-z]?', fbase) and e in ('+', '-', '2+', '3+', '2-', '3-'):
                    charge = e.replace('2', '²').replace('3', '³').replace('+', '⁺').replace('-', '⁻')
                    return f' {fbase}{charge} '  # an ion: norm() names it
                if fbase and fbase in UNITS and e in ('2', '3', '-1', '-2'):
                    if e == '-1':
                        return '/' + fbase
                    if e == '-2':
                        return '/' + fbase + '²'
                    return fbase + ('²' if e == '2' else '³')
                if e == '2':
                    return f' {b}的平方 ' if zh else f' {b} squared '
                if e == '3':
                    return f' {b}的立方 ' if zh else f' {b} cubed '
                if raw == '°′':
                    return f' {b}标准 ' if zh else f' {b} naught prime '
                if raw == '°':
                    return f' {b}度 ' if zh else f' {b} degrees '
                if raw == '′':
                    return f' {b}撇 ' if zh else f' {b} prime '
                p = self.say(sup)
                if e and e.startswith('-'):
                    p = ('负' if zh else 'minus ') + e[1:]
                if fbase == '10' and not zh:
                    return f' 10 to the {p} '
                return f' {b}的{p}次方 ' if zh else f' {b} to the power of {p} '
            return b
        return ''


def tex_speech(tex, lang, unknown=None):
    t = Tex(tex.strip().rstrip(',.。，'), lang)
    nodes = t.seq()
    if len(nodes) == 1 and nodes[0][0] == 'conc':  # a bare [S] in a sentence that already says "concentration"
        nodes = nodes[0][1]
    out = t.say(nodes)
    if unknown is not None:
        unknown.extend(t.unknown)
    # glue unit expressions back together ("μ m²/s" → "µm²/s") for norm()
    out = re.sub(r'\s+/', '/', out)
    out = re.sub(r'(?<=[A-Za-z0-9²³])\s+(?=/)', '', out)
    return out


# ---------------------------------------------------------------------------------------------------------
# The reading script of a lesson

def words(lang):
    return {
        'en': {'figure': 'Figure: ', 'answer': 'Answer: ', 'and': ' and ', 'table': 'Table, with columns ', 'stop': '.'},
        'zh': {'figure': '图：', 'answer': '答案：', 'and': '和', 'table': '表格，各列为：', 'stop': '。'},
    }[lang]


def sentence(s, lang):
    s = s.strip().rstrip(',，;；').strip()
    if not s:
        return ''
    if s[-1] not in '.!?。！？…:;：；':
        s += '。' if lang == 'zh' else '.'
    return s


def readable_elements(article):
    for ns in article.find_all('noscript'):
        ns.decompose()
    return [e for e in article.select(READABLE) if not e.find_parent(class_='widget-stage')]


SKIP_CLASSES = {'anchor', 'katex-html', 'qed', 'widget-stage', 'check', 'quiz-verdict', 'eqno', 'tag'}
BLOCK_TAGS = {'p', 'div', 'ul', 'ol', 'li', 'table', 'thead', 'tbody', 'tr', 'td', 'th', 'figure', 'figcaption', 'details',
              'summary', 'h1', 'h2', 'h3', 'h4', 'blockquote', 'pre', 'dl', 'dt', 'dd'}


def inline(node, lang, skip, unknown):
    from bs4 import Comment, NavigableString, Tag
    out = []
    for ch in node.children:
        if isinstance(ch, Comment):
            continue
        if isinstance(ch, NavigableString):
            out.append(str(ch))
            continue
        if not isinstance(ch, Tag):
            continue
        if id(ch) in skip:
            out.append(' ')
            continue
        cls = set(ch.get('class') or [])
        if cls & SKIP_CLASSES or ch.get('aria-hidden') == 'true' or ch.name in ('script', 'style', 'noscript', 'svg', 'button', 'input', 'select'):
            continue
        if 'katex' in cls:
            a = ch.find('annotation', attrs={'encoding': 'application/x-tex'})
            out.append(' ' + tex_speech(a.get_text(), lang, unknown) + ' ' if a else ' ')
            continue
        if 'math-tex' in cls:
            out.append(' ' + tex_speech(ch.get_text(), lang, unknown) + ' ')
            continue
        if ch.name == 'br':
            out.append(' ')
            continue
        inner = inline(ch, lang, skip, unknown)
        out.append(f' {inner} ' if ch.name in BLOCK_TAGS else inner)
    return ''.join(out)


def segment_text(e, lang, skip, unknown):
    W = words(lang)
    zh = lang == 'zh'
    cls = set(e.get('class') or [])
    txt = lambda n: norm(inline(n, lang, skip, unknown), lang)
    if 'blk-head' in cls:
        kind = e.find(class_='blk-kind')
        title = e.find(class_='blk-title')
        lvl = e.select_one('.lvl .visually-hidden')
        k = txt(kind) if kind else ''
        t = txt(title) if title else ''
        t = re.sub(r'^[(（](.*)[)）]$', r'\1', t)
        s = k
        if lvl:
            s += ('，' + txt(lvl)) if zh else (', ' + txt(lvl).lower())
        if t:
            s += ('：' if zh else ': ') + t
        return sentence(s, lang)
    if e.name == 'tr':
        return row_text(e, lang, skip, unknown)
    if e.name == 'figcaption':
        return W['figure'] + sentence(txt(e), lang)
    if 'math-block' in cls:
        parts = [tex_speech(a.get_text(), lang, unknown) for a in e.find_all('annotation', attrs={'encoding': 'application/x-tex'})]
        if not parts:
            parts = [tex_speech(m.get_text(), lang, unknown) for m in e.find_all(class_='math-tex')]
        return sentence(norm(' '.join(parts), lang), lang)
    if e.name == 'li' and e.find(class_='quiz-opt'):
        mark = e.find(class_='quiz-mark')
        body = e.find(class_='quiz-text')
        return (mark.get_text(strip=True) if mark else '') + ('：' if zh else ': ') + sentence(txt(body) if body else '', lang)
    if e.name == 'p':
        expl = e.find_parent(class_='quiz-expl')
        if expl is not None and expl.find('p') is e:
            quiz = expl.find_parent(class_='blk-quiz')
            letters = [b.find(class_='quiz-mark').get_text(strip=True) for b in quiz.select('.quiz-opt[data-ok="1"]')] if quiz else []
            prefix = (W['answer'] + W['and'].join(letters) + W['stop'] + ' ') if letters else ''
            return prefix + sentence(txt(e), lang)
    return sentence(txt(e), lang)


def row_text(tr, lang, skip, unknown):
    zh = lang == 'zh'
    table = tr.find_parent('table')
    cells = tr.find_all(['th', 'td'], recursive=False)
    vals = [norm(inline(c, lang, skip, unknown), lang).rstrip('.。') for c in cells]
    head_row = table.select_one('thead tr') if table else None
    head = [norm(inline(c, lang, skip, unknown), lang) for c in head_row.find_all(['th', 'td'], recursive=False)] if head_row else None
    if tr.find_parent('thead') is not None:
        cols = [v for v in vals if v]
        if not cols:
            return ''
        if zh:
            return '表格，各列为：' + '、'.join(cols) + '。'
        return 'Table, with columns ' + (', '.join(cols[:-1]) + ' and ' + cols[-1] if len(cols) > 1 else cols[0]) + '.'
    parts = []
    for i, v in enumerate(vals):
        if not v:
            continue
        if i > 0 and head and len(head) == len(vals) and head[i]:
            parts.append(f'{head[i]}：{v}' if zh else f'{head[i]}: {v}')
        else:
            parts.append(v)
    return ('。'.join(parts) + '。') if zh else ('. '.join(parts) + '.') if parts else ''


def script_for(page_html, lang):
    """[(element index, kind, text)] for the lesson in page_html, and the number of readable elements."""
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(page_html, 'html5lib')
    article = soup.select_one('article.lesson-body')
    if article is None:
        return None, 0, []
    els = readable_elements(article)
    skip = {id(e) for e in els}
    unknown = []
    segs = []
    for i, e in enumerate(els):
        t = segment_text(e, lang, skip - {id(e)}, unknown)
        if t and re.search(r'\w', t):
            kind = 'h2' if e.name == 'h2' else 'el'
            sid = e.get('id', '') if e.name == 'h2' else ''
            segs.append((i, kind, t, sid))
    return segs, len(els), unknown


# ---------------------------------------------------------------------------------------------------------
# Synthesis

def fetch(lang, course, chapter):
    url = f'{BASE}lesson.php?c={course}&l={chapter}&lang={lang}'
    req = urllib.request.Request(url, headers={'Host': HOST, 'User-Agent': 'medicine-atlas-tts'})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read().decode('utf-8')


def lessons(langs, only):
    out = []
    for lang in langs:
        for f in sorted((ROOT / 'content' / lang).glob('*/*.md')):
            course, chapter = f.parent.name, f.stem
            if only and not any(o == course or o == f'{course}/{chapter}' for o in only):
                continue
            out.append((lang, course, chapter))
    return out


def request_bytes(text):
    """Size of a line of text in a request (edge-tts counts the XML-escaped UTF-8)."""
    return len(xml_escape(text).encode('utf-8')) + 1


def split_long(text):
    """A segment too long for one request, cut into parts that fit: at sentence ends, else at commas or spaces."""
    parts = []
    while request_bytes(text) > REQUEST:
        cut = 0
        for pattern in (r'[.!?;:](?=\s)|[。！？；：]', r'[,，、](?=\s)|[，、]|\s'):
            for m in re.finditer(pattern, text):
                if request_bytes(text[:m.end()]) > REQUEST:
                    break
                cut = m.end()
            if cut:
                break
        if not cut:  # nowhere to cut: by characters
            cut = len(text)
            while request_bytes(text[:cut]) > REQUEST:
                cut = cut * 9 // 10
        parts.append(text[:cut].strip())
        text = text[cut:].strip()
    parts.append(text)
    return parts


def chunks_of(segs):
    """Split the script into sections (a new one at each h2), and each section into pieces that fit in one
    request. A segment too long for one request goes in parts; the parts after the first have no index, as
    the segment starts where its first part does."""
    sections, cur = [], []
    for s in segs:
        if s[1] == 'h2' and cur:
            sections.append(cur)
            cur = []
        cur.append(s)
    if cur:
        sections.append(cur)
    out = []
    for si, sec in enumerate(sections):
        piece, size = [], 0
        for s in sec:
            for k, part in enumerate(split_long(s[2])):
                size_part = request_bytes(part)
                if piece and size + size_part > REQUEST:
                    out.append((si, piece))
                    piece, size = [], 0
                piece.append((s[0] if k == 0 else None, s[1], part, s[3]))
                size += size_part
        out.append((si, piece))
    return out


def walk(text, events):
    """Find each event's word in the text, in order: the (position, time) of every word found, and the
    position after the last one."""
    pos, marks = 0, []
    for t, word in events:
        w = word.strip()
        if not w:
            continue
        j = text.find(w, pos, pos + 400 + len(w))
        if j < 0:
            continue
        marks.append((j, t))
        pos = j + len(w)
    return marks, pos


async def synth(text, voice, path, sem, retry_log, tries=5):
    """Speak one piece into path and return its word-boundary events, as (seconds, word). A piece that was not
    read to its end, or whose words do not fit its audio, is tried again."""
    import edge_tts
    delay = 5
    for attempt in range(tries):
        async with sem:
            try:
                events, words_end = [], 0.0
                c = edge_tts.Communicate(text, voice, boundary='WordBoundary', receive_timeout=120)
                with open(path, 'wb') as f:
                    async for ch in c.stream():
                        if ch['type'] == 'audio':
                            f.write(ch['data'])
                        elif ch['type'] == 'WordBoundary':
                            events.append((ch['offset'] / 1e7, html.unescape(ch['text'])))
                            words_end = (ch['offset'] + ch['duration']) / 1e7
                size = os.path.getsize(path)
                if size == 0:
                    raise RuntimeError('no audio returned')
                rest = text[walk(text, events)[1]:]
                if len(re.findall(r'\w', rest)) > 12:
                    raise RuntimeError(f'the stream ended early, before "{rest.strip()[:50]}"')
                if any(b[0] < a[0] for a, b in zip(events, events[1:])):
                    raise RuntimeError('word times out of order')
                if words_end > size / BYTES_PER_SECOND + 0.1:
                    raise RuntimeError('the audio is shorter than its words')
                return events
            except Exception as ex:  # network errors, throttling, a stream cut short: wait and retry
                err = ex
        if attempt + 1 < tries:
            retry_log(f'trying a piece again ({err})')
            await asyncio.sleep(delay)
            delay *= 3
    raise RuntimeError(f'synthesis failed after {tries} tries: {err}')


def duration(path):
    r = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', str(path)],
                       capture_output=True, text=True, check=True)
    return float(r.stdout.strip())


def align(text, starts, events):
    """Start time of each segment, from the word-boundary events: each event's word is found in the text in order."""
    times = [None] * len(starts)
    marks = walk(text, events)[0]
    k = 0
    for si, st in enumerate(starts):
        while k < len(marks) and marks[k][0] < st:
            k += 1
        if k < len(marks):
            times[si] = marks[k][1]
    for si in range(len(times)):  # segments with no word found take the time of the one before
        if times[si] is None:
            times[si] = times[si - 1] if si else 0.0
    return times


async def make(lang, course, chapter, args, sem, silence, log):
    key = f'{lang}/{course}/{chapter}'
    voice = VOICES[lang]
    try:
        page = await asyncio.to_thread(fetch, lang, course, chapter)
    except Exception as ex:
        log(f'{key}: could not fetch the page ({ex})')
        return 'failed'
    segs, n, unknown = script_for(page, lang)
    if not segs:
        log(f'{key}: no lesson text on the page')
        return 'failed'
    digest = hashlib.sha1(json.dumps([VERSION, voice, [s[2] for s in segs], n], ensure_ascii=False).encode()).hexdigest()
    out_mp3 = AUDIO / lang / course / f'{chapter}.mp3'
    out_json = out_mp3.with_suffix('.json')
    if not args.force and out_mp3.exists() and out_json.exists():
        try:
            if json.loads(out_json.read_text())['hash'] == digest:
                return 'unchanged'
        except Exception:
            pass
    t0 = time.time()
    with tempfile.TemporaryDirectory(prefix='tts-') as tmp:
        tmp = Path(tmp)
        pieces = chunks_of(segs)
        texts, starts = [], []
        for _, piece in pieces:
            text, st, p = '', [], 0
            for s in piece:
                st.append(len(text))
                text += s[2] + '\n'
            texts.append(text)
            starts.append(st)
        try:
            events = await asyncio.gather(*(synth(t, voice, tmp / f'{i:03d}.mp3', sem, lambda m: log(f'{key}: {m}'))
                                            for i, t in enumerate(texts)))
        except Exception as ex:
            log(f'{key}: {ex}')
            return 'failed'
        # join: a pause before each new section. The pieces are bare constant-bitrate MP3 frames, so they are
        # joined byte for byte and each piece lasts exactly its size over the byte rate.
        listing, clock, seg_times, sections = [], 0.0, [], []
        prev_sec = None
        for i, (si, piece) in enumerate(pieces):
            if prev_sec is not None and si != prev_sec:
                listing.append(silence)
                clock += silence.stat().st_size / BYTES_PER_SECOND
            if si != prev_sec:
                first = piece[0]
                sections.append([round(clock, 2), first[3] if first[1] == 'h2' else ''])
            prev_sec = si
            local = align(texts[i], starts[i], events[i])
            for s, lt in zip(piece, local):
                if s[0] is not None:
                    seg_times.append([s[0], round(clock + lt, 2)])
            clock += (tmp / f'{i:03d}.mp3').stat().st_size / BYTES_PER_SECOND
            listing.append(tmp / f'{i:03d}.mp3')
        if any(b[1] < a[1] for a, b in zip(seg_times, seg_times[1:])):
            log(f'{key}: segment times out of order')
            return 'failed'
        joined = tmp / 'lesson.mp3'
        with open(joined, 'wb') as out:
            for part in listing:
                out.write(part.read_bytes())
        total = duration(joined)
        if abs(total - clock) > 0.5:
            log(f'{key}: the joined audio lasts {total:.1f} s but its pieces add up to {clock:.1f} s')
            return 'failed'
        out_mp3.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(joined, str(out_mp3) + '.part')
        os.replace(str(out_mp3) + '.part', out_mp3)
    meta = {'v': VERSION, 'voice': voice, 'hash': digest, 'duration': round(total, 2), 'n': n,
            'segs': seg_times, 'sections': sections, 'made': time.strftime('%Y-%m-%d')}
    tmpj = str(out_json) + '.part'
    with open(tmpj, 'w', encoding='utf-8') as f:
        json.dump(meta, f, ensure_ascii=False, separators=(',', ':'))
    os.replace(tmpj, out_json)
    if unknown:
        log(f'{key}: TeX commands not read: {" ".join(sorted(set(unknown)))}')
    log(f'{key}: {total / 60:.1f} min of audio, {out_mp3.stat().st_size / 1e6:.1f} MB, in {time.time() - t0:.0f} s')
    return 'made'


def make_silence(path):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'lavfi', '-i', 'anullsrc=r=24000:cl=mono', '-t', str(GAP),
                    '-c:a', 'libmp3lame', '-b:a', '48k', '-ar', '24000', '-ac', '1', '-write_xing', '0', '-id3v2_version', '0',
                    str(path)], check=True)


async def run(args):
    todo = lessons(args.lang, args.only)
    sem = asyncio.Semaphore(args.jobs)
    lesson_sem = asyncio.Semaphore(max(1, args.jobs))
    counts = {'made': 0, 'unchanged': 0, 'failed': 0}

    def log(msg):
        print(time.strftime('%H:%M:%S'), msg, flush=True)

    with tempfile.TemporaryDirectory(prefix='tts-') as tmp:
        silence = Path(tmp) / 'gap.mp3'
        make_silence(silence)

        async def one(item):
            async with lesson_sem:
                r = await make(*item, args, sem, silence, log)
                counts[r] += 1

        log(f'{len(todo)} lessons, {args.jobs} at a time')
        await asyncio.gather(*(one(item) for item in todo))
    log(f"done: {counts['made']} made, {counts['unchanged']} unchanged, {counts['failed']} failed")
    return 1 if counts['failed'] else 0


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n\n')[0])
    ap.add_argument('only', nargs='*', help='courses or course/chapter to do (default: all)')
    ap.add_argument('--lang', action='append', choices=['en', 'zh'], help='language (default: both)')
    ap.add_argument('--jobs', type=int, default=4, help='requests to the speech service at a time (default 4)')
    ap.add_argument('--force', action='store_true', help='remake audio even when the script is unchanged')
    ap.add_argument('--text', action='store_true', help='print the reading script instead of making audio')
    ap.add_argument('--scan', action='store_true', help='list characters and TeX commands the scripts leave unread')
    args = ap.parse_args()
    args.lang = args.lang or ['en', 'zh']
    if args.text or args.scan:
        seen, unknown_all = {}, []
        for lang, course, chapter in lessons(args.lang, args.only):
            segs, n, unknown = script_for(fetch(lang, course, chapter), lang)
            unknown_all += unknown
            if args.text:
                print(f'===== {lang}/{course}/{chapter}: {len(segs)} segments of {n} readable elements, '
                      f'{sum(len(s[2]) for s in segs)} characters')
                for i, kind, t, sid in segs:
                    print(f'[{i}]{" #" + sid if sid else ""} {t}')
            for s in segs:
                for c in s[2]:
                    if (ord(c) > 0x2000 and not ('㐀' <= c <= '鿿') and c not in '，。、；：？！“”‘’（）《》…·「」—') \
                            or (lang == 'en' and c in '/<>=+~^_\\{}[]'):
                        seen.setdefault(c, set()).add(f'{lang}/{course}/{chapter}')
        if args.scan:
            for c, where in sorted(seen.items(), key=lambda kv: -len(kv[1])):
                print(f'{c!r} U+{ord(c):04X} in {len(where)} lessons, e.g. {sorted(where)[0]}')
            if unknown_all:
                print('TeX commands not read:', ' '.join(sorted(set(unknown_all))))
        return 0
    return asyncio.run(run(args))


if __name__ == '__main__':
    sys.exit(main())
