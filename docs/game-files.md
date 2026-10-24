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

## This repository is public, and includes them

This repository keeps `site/` and `site_meta.json` in git so the app runs straight after a
clone.

- **Credit:** the maps were taken from the [ishoutu aim trainer](https://ishoutu.cn/aim).
- **Size:** the site folder is about 190 MB, mostly 3D maps and textures.

## Optional: mods

Files in `app/mods/` replace the site file at the same path (for example a weapon skin in
`app/mods/aim-viewmodel/`).

## The long-term goal

Replace the game's maps and models with original or open-licensed work, such as maps made by
the community or models released as CC0. If you make 3D maps or models, see the issues
labelled **assets**.
