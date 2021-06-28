const WordList = require('./wordlist');
const { genRandomInt } = require('./utils');

function genThreeWords() {
  let threeWords = [];

  let listLen = WordList.length;
  // first is a random index in the array
  let first = genRandomInt(0, listLen);
  threeWords.push(WordList[first]);

  let second = genRandomInt(0, listLen-1);
  if(second >= first)
    second++;
  // second is a random index in the array other than first
  threeWords.push(WordList[second]);

  let third = genRandomInt(0, listLen-2);
  if(third >= Math.min(first, second))
    third++;
  if(third >= Math.max(first, second))
    third++;
  // third is a random index in the array other than first and second
  threeWords.push(WordList[third]);

  return threeWords;
}

function getInitialHint(wordString) {
  // All characters except a hyphen must be replaced by an underscore
  let hintString = "";
  for(let i = 0; i < wordString.length; i++) {
    if(wordString.charAt(i) == '-')
      hintString += '-';
    else
      hintString += '_';
  }
  return hintString;
}

function checkGuess(guessString, wordString) {
  return guessString.toLowerCase() == wordString.toLowerCase();
}

module.exports = { genThreeWords, checkGuess, getInitialHint };

