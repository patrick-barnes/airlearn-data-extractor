import type { GetV1ContentWordsResponse, Word } from "../model/words.js";
import { writeStringToFile } from "../util/file-util.js";
import { GOAL_UID } from "../config.js";
import { getWordsJsonFilename } from "../util/file-util.js";

const BASE_URL = 'https://api.unacademylanguage.com';

// Wait in between API calls to avoid rate limiting
const WAIT_MILLIS = 1000;
const WORDS_BATCH_SIZE = 50;

export class APIClient {

	private jwt: string;

	constructor() {
		this.jwt = process.env.JWT || '';
		if (!this.jwt) {
			throw new Error('JWT environment variable is not set');
		}
	}

	// common
	async doPost(path: string, payload: any): Promise<any> {
        // Wait in between API calls to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, WAIT_MILLIS));
        let url = `${BASE_URL}/${path}`;
        console.log(`Calling POST ${url}`);
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.jwt}`,
				'Airlearn-Req-Source': 'app',
				'X-App-Build-Number': '294',
				'X-DEVICE_ID': 'a238b03999e82bf0', // emulator
				'X-Platform': '1', // android
				'X-TIMEZONE': 'America/Chicago'
			},
			body: JSON.stringify(payload),
		});
		if (!response.ok) {
            console.log(`Error while calling POST ${url}`, response);
			throw new Error(`HTTP ${response.status}: ${await response.text()}`);
		}
        console.log(`OK from calling POST ${url}`); // , response
		return response.json();
	}

	// common
	async doGet(path: string): Promise<any> {
        // Wait in between API calls to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, WAIT_MILLIS));
        let url = `${BASE_URL}/${path}`;
        console.log(`Calling GET ${url}`);
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${this.jwt}`,
				'Airlearn-Req-Source': 'app',
				'X-App-Build-Number': '294',
				'X-DEVICE_ID': 'a238b03999e82bf0', // emulator
				'X-Platform': '1', // android
				'X-TIMEZONE': 'America/Chicago'
			},
		});
		if (!response.ok) {
            console.log(`Error while calling GET ${url}`, response);
			throw new Error(`HTTP ${response.status}: ${await response.text()}`);
		}
        console.log(`OK from calling GET ${url}`); // , response
		return response.json();
	}

	// endpoint-specific
    async getV1ContentWords(
		goal_uid: string, // ENGCHN
		limit: number, // 50
		offset: number, // 0, 50, etc.
		order: number, // 1 or 2
		is_important: number, // 0 or 1
	): Promise<any> {
		let url = `apollo/v1/content/words/?limit=${limit}&offset=${offset}&goal_uid=${goal_uid}&order=${order}&is_important=${is_important}`;
		let words = await this.doGet(url);
        return words;
    }

	async fetchAndSaveWords(): Promise<Word[]> {
	  console.info('fetchAndSaveWords() called');
	  let limit = WORDS_BATCH_SIZE;
	  let offset = 0; // start at the beginning
	  let order = 1; // 1=recent, 2=a-z
	  let isImportant = 0; // 0=all, 1=starred
	  let done = false;
	  let allWords: Word[] = [];
	  while (!done) {
		let wordsResponse: GetV1ContentWordsResponse = await this.getV1ContentWords(GOAL_UID, limit, offset, order, isImportant);
		let words: Word[] = wordsResponse.data.words;
		allWords = allWords.concat(words);
		if (!(wordsResponse.next)) {
		  done = true;
		} else if (allWords.length >= wordsResponse.count) {
		  console.warn(`WARNING: avoided infinite loop; next was not empty but we already fetched count=${wordsResponse.count} words.`);
		  done = true;
		} else {
		  offset += limit;
		}
	  }
	  let wordsJson = JSON.stringify(allWords, null, 2);
	  let wordsJsonFilename = getWordsJsonFilename();
	  writeStringToFile(wordsJson, wordsJsonFilename);
	  return allWords;
	}

}
