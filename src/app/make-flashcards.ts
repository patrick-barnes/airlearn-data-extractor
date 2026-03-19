import type { Script, Word } from "../model/words.js";
import { getLexemeFlashcardsTsvFilename, getWordsJsonFilename, readJsonFromFile, writeStringToFile } from "../util/file-util.js";

interface Note {
    //id: string;
    english: string;
    //context: string;
    foreign: string;
    transliteration: string;
};

function noteToTsvRow(note: Note): string {
    let row = [
        //note.id,
        note.english,
        //note.context,
        note.foreign,
        note.transliteration,
    ].join('\t');
    return row;
}

const NOTE_TSV_HEADERS = [
    //"ID",
    "English",
    //"Context",
    "Foreign",
    "Transliteration",
];

function extractHighlightInnerHtml(highlightedText: string): string {
    // Example input: "<highlight ...>​​软件</highlight> (ruǎnjiàn)"
    // Desired output: "​​软件"
    return highlightedText.replace(/<highlight[^>]*>(.*?)<\/highlight>.*/g, '$1');
}

function extractPronuncationInner(pronunciationOuter: string): string {
    // Example input: "[ruǎnjiàn]"
    // Desired output: "​​ruǎnjiàn"
    return pronunciationOuter.replace(/^\[(.*?)\]$/, '$1');
}

function makeFlashCards(words: Word[]): Note[] {
    let notes: Note[] = [];
    for (let word of words) {
        let script = extractHighlightInnerHtml(word.text);
        let pronuncation = extractPronuncationInner(word.pronounciation);
        let note: Note = {
            //id: string;
            english: word.meaning,
            //context: "",
            foreign: script,
            transliteration: pronuncation,
        };      
        notes.push(note);
    }
    return notes;
}

function saveFlashCardsToTsv(notes: Note[], filename: string) {
    let tsvRows: string[] = [];
    let headerRow: string = NOTE_TSV_HEADERS.join('\t');
    tsvRows.push(headerRow);
    for (let note of notes) {
        let row = noteToTsvRow(note);
        tsvRows.push(row);
    }
    const tsvContent = tsvRows.join('\n');
    writeStringToFile(tsvContent, filename);
}

let wordsJsonFilename = getWordsJsonFilename();
let wordsFlashcardsJsonFilename = getLexemeFlashcardsTsvFilename();
let words: Word[] = readJsonFromFile(wordsJsonFilename);
words.reverse(); // reverse most recent = learned order
let notes: Note[] = makeFlashCards(words);
saveFlashCardsToTsv(notes, wordsFlashcardsJsonFilename);
