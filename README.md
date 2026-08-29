# Full Stack Open: Continuous integration

Pokedex application used for building a CI/CD pipeline with GitHub Actions.

## Commands

Run `npm install` inside the project folder first.

| Command | Description |
| --- | --- |
| `npm start` | webpack dev server |
| `npm test` | Jest component tests |
| `npm run test:e2e` | Playwright end to end tests |
| `npm run eslint` | lint the code |
| `npm run build` | production build |
| `npm run start-prod` | run the production build with Express |

The end to end tests start the production server themselves, so run
`npm run build` before them.

## Pipeline

The workflows live in [.github/workflows](./.github/workflows):

- `hello.yml` – prints a greeting, the date and the directory contents
- `pipeline.yml` – runs on pushes to main and on pull requests, in the jobs
  `lint_and_test`, `deploy`, `notify_success`, `notify_failure` and
  `tag_release`

Only pushes to the main branch are deployed and tagged, and a commit message
containing `#skip` leaves both out. The deployment is triggered with a Render
deploy hook and the build notifications are sent to Discord; both addresses
come from the repository secrets `RENDER_DEPLOY_HOOK` and `DISCORD_WEBHOOK`.
Releases are tagged with a patch bump of the previous version.

## Endpoints

The Express server that serves the production build also has two endpoints
used by the pipeline and the hosting service:

- `/health` – health check used by Render
- `/version` – version string, changed to verify that a new version is live
