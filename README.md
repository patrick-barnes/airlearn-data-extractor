# AirLearn Data Extractor

Makes flashcards from AirLearn language learning data.

For examples of generated flashcards, see:

- `output-airlearn-example`

## Initial setup

1. `npm install`

2. Copy `.env.example` to `.env`.

## Usage

### How to make Anki flashcards for AirLearn

1. In `.env`, set `AIRLEARN_JWT` to your AirLearn JWT token.

2. In `src/airlearn/config.ts`, set the language

3. `npm run airlearn-fetch-words` to create `words.json`

4. `npm run airlearn-make-flashcards` to create `lexeme-flashcards.tsv`

Check the `output-airlearn` folder for results.

## Current limitations

- creates only word flashcards, not sentence flashcards
- creates flashcards only for words you've already learned
