# QuickNotes App

A lightweight, persistent note-taking web application built with vanilla JavaScript. QuickNotes allows users to create, categorize, search, and manage notes directly in the browser with automatic saving.

## Features
- Add notes with Personal, Work, or Study categories
- Live character validation and error messaging
- Instant search filtering across all notes
- Persistent storage using localStorage (survives refresh)
- Fully responsive design for mobile and desktop
- Category-specific color coding for visual organization

## How to Run
1. Clone this repository: `git clone https://github.com/DoubleM840/quicknotes-app.git`
2. Open `index.html` in any modern web browser
3. No server or installation required!

## What I Learned
1. **DOM Manipulation Patterns:** Mastered the "Data → Render" cycle where UI is always rebuilt from state rather than manually updated, preventing sync bugs.
2. **CSS Architecture:** Learned to use CSS variables and utility classes for theming, making dark mode and category styling scalable without repetition.
3. **Browser Storage:** Understood the limitations of localStorage (string-only, 5MB limit) and how to safely serialize/deserialize complex objects using JSON.