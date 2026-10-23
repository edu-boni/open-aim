# Game files

The app is a shell around the open-aim web game. To run, it needs the game's files in a
`site/` folder at the root of the repository:

```
open-aim/
├─ app/
├─ scenarios/
├─ site/            ← game files
│  ├─ aim/
│  ├─ aim-maps/
│  ├─ aim-agents/
│  ├─ _assets/
│  └─ …
└─ site_meta.json   ← response headers for the site files
```

`app/main.js` serves this folder on `http://127.0.0.1:8000` and opens it in the app window.

## This repository is private, and includes them

This private copy keeps `site/` and `site_meta.json` in git so the app runs straight after a
clone. **Remove them before making the repository public:**

- **Rights:** the game engine and drills come from another developer's web trainer, and the
  maps, character models, weapon models and sounds come from a commercial game. None of that
  can be published under this project's license.
- **Size:** the site folder is about 190 MB, mostly 3D maps and textures.

To publish only the parts that are yours, delete `site/` and `site_meta.json` from the
repository and add both to `.gitignore`.

## Optional: mods

Files in `app/mods/` replace the site file at the same path (for example a weapon skin in
`app/mods/aim-viewmodel/`).

## The long-term goal

Replace every file we can't share with original or open-licensed work, such as maps made by the
community or models released as CC0. Then the whole trainer can live in this repository and
anyone can download it. If you make 3D maps or models, see the issues labelled **assets**.
