# Kanishka Mitra Personal Website

Minimal academic personal website built with plain HTML, CSS, and JavaScript in a stripped-down academic homepage style.

## Files

- `index.html`: page content and section structure
- `styles.css`: all visual styling
- `script.js`: tiny fallback for a missing headshot
- `assets/`: place your headshot and CV here

## How to add your headshot

1. Add your photo at `assets/headshot.jpg`
2. Keep the filename exactly `headshot.jpg`
3. A square image works best, ideally at least 900 x 900 px

If the file is missing, the page shows a simple fallback message instead.

## How to add your CV

1. Add your PDF at `assets/kanishka-mitra-cv.pdf`
2. Keep the filename exactly `kanishka-mitra-cv.pdf`

The existing CV buttons already point to that file path.

## What to edit

Open `index.html` and replace the placeholder text in:

- intro / bio paragraph
- research interests
- selected publications
- projects
- Scholar, GitHub, and email links

## Local preview

If you want to preview locally:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.
