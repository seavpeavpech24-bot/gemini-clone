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

3. Start the dev server:

```powershell
npm run dev
```

Open the URL that Vite prints (usually `http://localhost:5173`).

## Files of interest
- `src/config/gemini.js` — wrapper around `@google/generative-ai`. Reads the API key from `import.meta.env.VITE_GEMINI_API_KEY`.
- `src/context/Context.jsx` — holds application state and the `onSent` function which calls the AI and manages the typewriter effect.
- `src/component/Main/Main.jsx` — main UI, input and results rendering.
- `src/component/Sidebar/Sidebar.jsx` — sidebar controls and recent prompts.

## Recommended changes before publishing
1. Remove any embedded API keys from the repo immediately and rotate them if they were committed earlier.
2. Read the model output safely: avoid `dangerouslySetInnerHTML` with untrusted content or sanitize it first to mitigate XSS risks.
3. Add error handling around network/API calls in `Context.jsx` so the UI recovers on failure.
4. Consider limiting the typewriter scheduling for extremely long responses and wait for the typing animation to finish before toggling loading state.
5. Add a `README` section that documents environment variables and running tests (if/when tests are added).

## Environment Variables
- `VITE_GEMINI_API_KEY`: Your Google Generative AI API key. Required for the app to function. Obtain one from the [Google AI Studio](https://aistudio.google.com/app/apikey).
