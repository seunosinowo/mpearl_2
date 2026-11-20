# Mpearl Diagnostics

Public website for Mpearl Clinical Laboratory and Diagnostics Services in Surulere, Lagos. Service and package details live in `src/lib/mpearl-content.ts`.

## Development

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
npm test
npm run build
```

## GitHub Pages

The Pages workflow builds the site from `main` and publishes the Vite build from `dist`. Set the publishing source to GitHub Actions in the repository's Pages settings.
