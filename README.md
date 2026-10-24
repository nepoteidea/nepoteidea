# nepoteidea

Personal website of Sebastian Nepote at **[nepoteidea.com](https://nepoteidea.com)**, built with Svelte 5 + TypeScript and Vite.
It implements the Claude Design project ["Nepoteidea v2"](https://claude.ai/design/p/64c2b358-4d83-4dd5-ab3e-798efc84a704?file=Nepoteidea+v2.html)
(ported from the React prototype) and tracks the Linear project
[Personal website — nepoteidea.com](https://linear.app/nepoteidea/project/personal-website-nepoteideacom-49563f39cf1b).

## Getting started

```sh
npm install
npm run dev
```

| Script                  | What it does                                   |
| ----------------------- | ---------------------------------------------- |
| `npm run dev`           | Start the dev server                           |
| `npm run build`         | Production build into `dist/`                  |
| `npm run preview`       | Serve the production build                     |
| `npm run check`         | Type-check Svelte and TypeScript               |
| `npm test`              | Run the test suite once                        |
| `npm run test:coverage` | Run tests with coverage and enforce thresholds |

## Project layout

```
src/
  lib/content.ts        Page copy: strengths, career timeline, projects, games, contact and social links
  lib/terminal.ts       Typing-animation script and step logic for the hero terminal
  lib/Terminal.svelte   Hero terminal window
  lib/reveal.ts         Scroll-reveal action
  lib/theme.ts          Dark/light theme persistence and reduced-motion detection
  App.svelte            Page layout
  app.css               Design tokens and styles (from the design's nepoteidea-styles.css)
public/                 Favicons, project screenshots, web manifest, robots.txt
```

Social links in `src/lib/content.ts` are hidden until they have a URL. Visitors who prefer reduced motion get the
static version (no typing, drifting blobs or reveal animations).

## Deployment

The site is a static-assets [Cloudflare Worker](https://developers.cloudflare.com/workers/static-assets/) named
`nepoteidea`, configured in `wrangler.jsonc` and attached to `nepoteidea.com` as a custom domain (Cloudflare manages
the DNS record and certificate).

- **Push / merge to `main`** → `.github/workflows/deploy.yml` builds and runs `wrangler deploy` to production.
- **Pull requests** → a preview version is uploaded and its `pr-<N>-nepoteidea.<subdomain>.workers.dev` URL is posted
  as a PR comment. Production is untouched.
- `.github/workflows/ci.yml` runs type-checks, tests with coverage and the build on every push and PR.

The workflows need the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets.
