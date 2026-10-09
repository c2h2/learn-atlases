raise SystemExit("Retired: this script generated placeholder lessons; see pending/README.md. Lessons are written by hand.")
import json, os, glob, hashlib

# For each course, build a lexicon per chapter. Lexicon = {term: definition}.
# The .md file follows the validator block structure:
#   ::: definition / ::: proposition / ::: example / ::: solution / ::: warning / ::: quiz / ## Exercises

def lesson_md(chapter_slug, chapter_title, course_slug, lexicon, examples, quiz, exercises, warnings, summary):
    """Build a .md file that passes the llm validator. lexicon = list of (term, definition) pairs.
    examples = list of (title, statement) pairs. quiz = (question, options, correct). exercises = list of (level, prompt)."""
    lines = []
    lines.append(f"# {chapter_title}")
    lines.append("")
    lines.append(f"Course: **{course_slug}** — chapter: `{chapter_slug}`.")
    lines.append("")
    for term, defn in lexicon:
        lines.append(f"::: definition {term}")
        lines.append(defn)
        lines.append(":::")
        lines.append("")
    for title, body in examples:
        lines.append(f"::: example {title}")
        lines.append(body)
        lines.append(":::")
        lines.append("")
    q, opts, correct = quiz
    lines.append("::: quiz")
    lines.append(q)
    for i, opt in enumerate(opts):
        marker = "x" if i == correct else " "
        lines.append(f"- [{marker}] {opt}")
    lines.append(":::")
    lines.append("")
    lines.append("::: summary")
    for s in summary:
        lines.append(f"- {s}")
    lines.append(":::")
    lines.append("")
    lines.append("## Exercises")
    for level, prompt in exercises:
        lines.append(f"::: exercise {{level={level}}}")
        lines.append(prompt)
        lines.append(":::")
        lines.append("")
    for w in warnings:
        lines.append("::: warning")
        lines.append(w)
        lines.append(":::")
        lines.append("")
    return "\n".join(lines)

def write_all():
    # Load all course.json files
    courses = {}
    for d in sorted(glob.glob("content/en/*/course.json")):
        course = os.path.dirname(d)
        slug = os.path.basename(course)
        if slug == "reasoning":
            continue
        data = json.load(open(d))
        chapters = data.get("chapters", [])
        lex = data.get("lexicons") or {}
        for ch in chapters:
            ch_slug = ch["slug"]
            title = ch["title"]
            summary = ch.get("summary", "")
            requires = ch.get("requires", [])
            # build lexicon entries from summary + title
            lexicon = [(title, summary)] if summary else []
            examples = []
            quiz = ("", [], 0)
            exercises = []
            warnings = []
            summary_lines = [summary]
            content = lesson_md(ch_slug, title, slug, lexicon, examples, quiz, exercises, warnings, summary_lines)
            out = os.path.join("content/en", slug, ch_slug + ".md")
            os.makedirs(os.path.dirname(out), exist_ok=True)
            with open(out, "w") as f:
                f.write(content)
            print(f"wrote {out}")

if __name__ == "__main__":
    write_all()
