import * as fs from 'fs';
import * as path from 'path';
import { GOAL_UID } from '../config.js';

export function writeStringToFile(s: string, filename: string): void {
    console.log('Writing to file: ' + filename);
    let folder = path.dirname(filename);
    console.debug("- folder=" + folder);
    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(filename, s, 'utf-8');
    console.log('Wrote ' + s.length + ' characters to: ' + filename);
}

export function readJsonFromFile(filename: string): any {
    console.log('Importing JSON data from: ' + filename);
    const fileContent = fs.readFileSync(filename, 'utf-8');
    console.log('Read ' + fileContent.length + ' characters from: ' + filename);
    const data = JSON.parse(fileContent);
    console.log('Parsed JSON data from: ' + filename);
    return data;
}

export function getWordsJsonFilename(): string {
    return `output/${GOAL_UID}/words.json`;
}

export function getLexemeFlashcardsTsvFilename() {
    return `output/${GOAL_UID}/flashcards/lexeme-flashcards.tsv`;
}
