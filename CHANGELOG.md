# Changelog

All notable changes to open-aim. Newest first.

## [1.1.0] - 2026-10-24

### Added

- Desktop frame settings in Video: Frame mode (No frame limit), an FPS cap up to 1000
  and a VSync toggle with a restart button.
- Map culling (Video > Smoothness, off by default): maps are batched in 32 m chunks so
  only the parts in view are drawn. Same picture, 50-80% fewer triangles. Turn it on
  for laptops and integrated graphics; on strong graphics cards it can lower FPS.
- FPS meter shows the game's CPU time per frame in rounds.
- Interface setting (Video > Smoothness): Enhanced (default) or Performance, with solid
  panels instead of glass blur.

### Fixed

- FPS meter counts the frames the game draws, so it shows the real frame rate with No
  frame limit instead of the monitor's refresh rate.
- Round start screen ("Click anywhere to start") uses the esports look again.
- Shader warm-up no longer throws and stalls when a map's materials are replaced.

## [1.0.0] - 2026-10-23

First version as a repository.

### Added

- Desktop app with a local game server, offline mode and file overrides.
- Esports theme, top bar, FPS meter, sensitivity tools and backups.
- Studio: build drills on a 2D map with bots, smoke and cover, preview them in 3D, and play them.
- 25 extra scenarios, one file each in `scenarios/`.
- Clear English names and descriptions for all 99 drills.
- `scripts/build-scenarios.mjs` to check scenarios and build the training list.
- Contribution guide, issue and pull request templates, and a CI check for scenarios.
- `examples/starter-drill.json`, Discussion forms, a release guide and a GitHub Pages site.
