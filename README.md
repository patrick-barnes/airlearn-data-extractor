# AirLearn Data Extractor

Makes flashcards from AirLearn language learning data.

Requires an AirLearn account, which is free.

For examples of generated flashcards, see:

- `output-example`


## Setup

1. `npm install`

2. Copy `.env.example` to `.env`.

3. In `.env`, set `JWT` to your JWT.

4. In `.env`, set `GOAL_UID` per the learning language.


## Usage

1. `npm run fetch-words` to create `words.json`

2. `npm run make-flashcards` to create `lexeme-flashcards.tsv`

Check the `output` folder for results.


## Current limitations

- creates only word flashcards, not sentence flashcards
- creates flashcards only for words learned on the account


## How to get your AirLearn JWT token

If you are using Android, one way is:

- Use Google Android Studio to create a virtual device
- Use an app like HTTP Tooklit to capture network traffic
- Install AirLearn on the device and log in to AirLearn
- Inspect traffic and get the JWT from the Authorization header
