# Simple Spotify Downloader

[![Build Status](https://travis-ci.org/saeedvaziry/spotdl.svg?branch=master)](https://travis-ci.org/saeedvaziry/spotdl)

Simple spotify downloader web application uses <a href="https://github.com/ritiek/spotify-downloader" target="_blank">spotify-downloader</a> repository by <a href="https://github.com/ritiek" target="_blank">ritiek</a>.

Also uses <a href="https://github.com/Automattic/kue">Kue</a> by <a href="https://github.com/Automattic">Automattic</a> to handle queue jobs.


## Requirements

- nodejs 8 or 10
- redis

## Installation

Run `npm install`

Rename `.env.example` to `.env` and config it.

## Run

- Run `node server.js` for starting server
- Run `node worker.js` for starting worker to download tracks

## Tests

Run `npm test`

## ESLint

Run `npm run lint`

## Screenshot

<img src="./screenshots/spotdl-1.png"/>

<img src="./screenshots/spotdl-2.png"/>

## License

This repo is open-sourced software licensed under the MIT license.
