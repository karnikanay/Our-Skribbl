const WordList = require('./wordlist');
import { genRandomInt } from './utils'

export function genThreeWords() {
  let threeWords = [];

  let listLen = WordList.length;
  let first = genRandomInt(0, listLen-2);
  threeWords.push(WordList[first]);

  let second = genRandomInt(first+1, listLen-1);
  threeWords.push(WordList[second]);

  let third = genRandomInt(second+1, listLen);
  threeWords.push(WordList[third]);

  return threeWords;
}

export function getInitialHint(wordString) {
  // All characters except a hyphen must be replaced by an underscore
  let hintString = "_".repeat(wordString.length);

  for(let i = 0; i < wordString.length; i++)
    if(wordString[i] == '-')
      hintString[i] = '-';

  return hintString;
}

export function checkGuess(guessString, wordString) {
  return guessString.toLowerCase() == wordString.toLowerCase();
}

