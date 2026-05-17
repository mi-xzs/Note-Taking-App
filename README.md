# Note-Taking App

Stylised Markdown note-taking app with tag-based filtering and search. React + TypeScript + Vite
https://vercel.com/migle-s-projects/note-taking-app/AxorQ8cj46NqB6VoZ1dsqvTXJBFA


## Features

- Write notes in **Markdown** with live-rendered output
- Tag notes with reusable, user-defined tags
- Filter notes by **title** and **multiple tags** at once
- Inline **tag management** (rename, delete) via modal
- Edit and delete existing notes
- **localStorage** persistence — your notes stay on refresh
- Responsive grid layout across mobile, tablet, and desktop

## Tech stack

## Tech stack
React 19 · TypeScript · Vite

## Project structure

```
src/
  App.tsx              Top-level routes and note/tag state
  main.tsx             Vite entry point
  NoteList.tsx         Home view: search, filter, grid of notes
  NoteForm.tsx         Shared form used by New/Edit
  NewNote.tsx          Create-note route
  EditNote.tsx         Edit-note route
  NoteLayout.tsx       Route layout that resolves :id -> Note
  Note.tsx             Single-note view with rendered markdown
  useLocalStorage.ts   Typed localStorage hook
```
