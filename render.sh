#!/usr/bin/env bash

rm -rf dist/
mkdir dist/
cp -r public/ dist/public
minijinja-cli templates/home.html > dist/index.html
minijinja-cli templates/credits.html > dist/credits.html
minijinja-cli templates/404.html > dist/404.html
minijinja-cli templates/friendtaro.html > dist/friendtaro.html
minijinja-cli templates/messages.html -f json data/messages.json > dist/messages.html
minijinja-cli templates/timeline.html -f json data/timeline.json > dist/timeline.html
