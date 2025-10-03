# Gemini Clone

A small React + Vite front-end that simulates a Gemini-like chat UI and demonstrates integration with Google's Generative AI client. This project provides a minimal chat interface with a sidebar for recent prompts, a typewriter-style response display, and a simple input area.

## Features
- Minimal chat UI (input, send button, results area)
- Sidebar with recent prompts and "New Chat"
- Typewriter-style incremental display of AI responses
- Uses `@google/generative-ai` to call a Gemini model through `src/config/gemini.js`

## Important security note
This repository previously contained an API key inside `src/config/gemini.js`. Do NOT push API keys or secrets to version control. Instead, use environment variables. The project `.gitignore` already excludes `.env` files.

## Setup
1. Install dependencies:

```powershell
npm install
```

2. Create a `.env` file in the project root (this file is gitignored). Add your API key like this:

```
VITE_GEMINI_API_KEY=your_api_key_here
```

3. Update `src/config/gemini.js` to read the API key from `import.meta.env.VITE_GEMINI_API_KEY` (see notes below). Do NOT commit the key.

4. Start the dev server:

```powershell
npm run dev
```

Open the URL that Vite prints (usually `http://localhost:5173`).

## Files of interest
- `src/config/gemini.js` — wrapper around `@google/generative-ai`. Replace hard-coded key with `import.meta.env.VITE_GEMINI_API_KEY`.
- `src/context/Context.jsx` — holds application state and the `onSent` function which calls the AI and manages the typewriter effect.
- `src/component/Main/Main.jsx` — main UI, input and results rendering.
- `src/component/Sidebar/Sidebar.jsx` — sidebar controls and recent prompts.

## Recommended changes before publishing
1. Remove any embedded API keys from the repo immediately and rotate them if they were committed earlier.
2. Read the model output safely: avoid `dangerouslySetInnerHTML` with untrusted content or sanitize it first to mitigate XSS risks.
3. Add error handling around network/API calls in `Context.jsx` so the UI recovers on failure.
4. Consider limiting the typewriter scheduling for extremely long responses and wait for the typing animation to finish before toggling loading state.
5. Add a `README` section that documents environment variables and running tests (if/when tests are added).

## Next steps I can implement for you
- Replace hard-coded API key with environment variable usage in `src/config/gemini.js`.
- Add a small improvement: try/catch and an error state for failed requests.
- Sanitize or safer-render the model output instead of directly injecting HTML.
- Add a minimal unit test for the response parsing logic.

If you want any of these implemented now, tell me which one and I'll apply the change and run a quick smoke validation.

---
Generated on 2025-10-03
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
