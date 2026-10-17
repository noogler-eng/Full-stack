# The Go Handbook

A 21-chapter, end-to-end Go guide in plain English, with a Claude-style dark theme.

## Open it

Serve the folder (recommended, so fonts and the code highlighting load properly):

```bash
cd go/docs && python3 -m http.server 8765
```

Then open http://localhost:8765. You can also double-click `index.html`.

## Structure

| Part | Chapters |
|---|---|
| I · Foundations | 01 Introduction & Setup · 02 Variables, Types & Constants · 03 Control Flow · 04 Functions & Closures |
| II · Working with Data | 05 Arrays, Slices & Maps · 06 Strings, Bytes & Runes · 07 Structs, Methods & Pointers |
| III · Abstraction & Robustness | 08 Interfaces · 09 Generics · 10 Error Handling · 11 Packages & Modules |
| IV · Concurrency | 12 Goroutines & Channels · 13 Sync & Patterns · 14 Context |
| V · Production Go | 15 Testing · 16 Standard Library · 17 HTTP APIs · 18 Performance |
| VI · Senior Engineer Track | 19 Senior Playbook · 20 Shipping to Production · 21 Capstone: Task API |

## Files

- `assets/style.css`: the theme
- `assets/app.js`: the chapter list (one source of truth), sidebar, table of contents, live walkthroughs, quizzes and progress tracking
- `chapters/_TEMPLATE.html`: the markup for every component; start here to add a chapter

To add a chapter, copy the template, then add an entry to `CHAPTERS` in `assets/app.js`.

Every example was run with Go 1.27.1, and the output shown is the real output.
