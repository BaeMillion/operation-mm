# Prerequisites

- Rust toolchain, version 1.77.2 or later. As of writing, I'm personally using 1.78.0.

## For Cloudflare Pages deployment

You only need these if you want to deploy to Cloudflare Pages.

- NPM
- Cloudflare Wrangler

# Development

Simply running the Rust code, e.g. `cargo run`, will start up a local server on port 3000 using axum. The HTML templates are found in `templates/` and are rendered using minijinja. Static files such as CSS, JavaScript, and images are found in `public/` and also get served from matching `public/*` paths from the server.

If you add or change any page routes, you have to also change the `page_paths` array in the `build_static` function for the page to be rendered in static generation later.

# Getting a copy of the data

The data lives in and is handled by another repo: https://github.com/BaeMillion/baemillion-data which publishes to `data.baemillion.com`.

An example of how to grab a copy for local development.

```bash
wget https://data.baemillion.com/latest.tar.gz
tar -xvzf latest.tar.gz
```

Or if a `.zip` file is preferred.

```
wget https://data.baemillion.com/latest.zip
unzip latest.zip
```

# Static Site Generation and Deployment

## Using the Rust setup

Running the Rust code with a `--build` argument will render the entire static site to the `dist/` directory.

```
cargo run -- --build
```

## Alternate method with only `minijinja-cli`

The `render.sh` script will copy all the files and render all the templates using `minijinja-cli` required into the `dist/` directory. The script assumes the required JSON data, `messages.json` & `timeline.json`, exist under `data/`.

```
./render.sh
```

The site can be served locally for development using the following Python command.

```
python -m http.server 3000 -d dist
```

The static site can then be browsed locally starting from `dist/index.html`.

## Deploying to Cloudflare Pages
If you want to deploy to Cloudflare Pages, change the `name` value in `wrangler.toml` to a name of a project on your Cloudflare account, then run `npx wrangler pages deploy`.

## Deploying to GitHub Pages

The GitHub Actions workflow found at `.github/workflows/publish.yml` will automatically trigger a run to publish to GitHub Pages whenever commits are pushed to the default branch.

The repo needs to have GitHub Pages enabled with GitHub Actions workflow as the page source. See the instructions here: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow
