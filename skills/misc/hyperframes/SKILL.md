---
name: hyperframes
description: "heygen-com/hyperframes video generation framework for agents."
---

# hyperframes Skill

This is the skill wrapper for the `heygen-com/hyperframes` framework. HyperFrames is an open-source framework for turning HTML, CSS, media, and seekable animations into deterministic MP4 videos. Use it locally with the CLI, from AI coding agents with skills, or as the rendering core behind hosted authoring workflows.

## AI Agent Instructions

When the user asks to create a video using Hyperframes (e.g. "make a product launch video", "convert this website to video", "create a slideshow"), follow these steps:

1. **Install the skills**:
   First, you must install the Hyperframes skills for the agent if they aren't installed:
   ```bash
   npx skills add heygen-com/hyperframes --full-depth --yes
   ```
   *Note: Always use `--full-depth` to ensure you get the latest version from `main`.*

2. **Route the request**:
   Use the `/hyperframes` command or directly invoke one of the creation workflows. HyperFrames ships with ~20 skills loaded on demand.

3. **Creation Workflows**:
   You can use these specific workflows based on the user's request:
   - `/product-launch-video`
   - `/website-to-video`
   - `/faceless-explainer`
   - `/pr-to-video`
   - `/embedded-captions`
   - `/talking-head-recut`
   - `/motion-graphics`
   - `/music-to-video`
   - `/slideshow`
   - `/general-video`
   - `/remotion-to-hyperframes`

4. **Update existing skills**:
   To update existing hyperframes skills:
   ```bash
   npx hyperframes init
   ```
   Or update a specific workflow:
   ```bash
   npx hyperframes skills update <workflow>
   ```

## Production Loop
The typical HyperFrames production loop for agents is:
1. Plan the video
2. Write valid HTML
3. Wire seekable animations
4. Add media
5. Lint (`npx hyperframes lint`)
6. Preview (`npx hyperframes preview`)
7. Render (`npx hyperframes render`)
