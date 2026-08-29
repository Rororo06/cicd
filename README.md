# Full Stack Open: Continuous integration

Pokedex application used for building a CI/CD pipeline with GitHub Actions.

- Deployed application: https://pokedex-w2xe.onrender.com
- The application with a pipeline of its own:
  https://github.com/Rororo06/openfullstack

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
- `health_check.yml` – asks the deployed app once a day whether it is healthy,
  and can also be started by hand

Only pushes to the main branch are deployed and tagged, and a commit message
containing `#skip` leaves both out. A deployment is started through the Render
API and is followed by a wait until the new version answers, so a broken
deployment fails the pipeline. The build notifications are sent to Discord.
The credentials come from the repository secrets `RENDER_API_KEY`,
`RENDER_SERVICE_ID` and `DISCORD_WEBHOOK`. Releases are tagged with a patch
bump of the previous version.

## Endpoints

The Express server that serves the production build also has two endpoints
used by the pipeline and the hosting service:

- `/health` – health check used by Render
- `/version` – version string, changed to verify that a new version is live

Adding `#skip` to a commit message leaves the deployment and the tagging out.

