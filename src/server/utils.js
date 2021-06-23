
// returns a random integer in [min, max)
function genRandomInt(min, max) {
  return min + Math.floor(Math.random()*(max-min));
}

module.exports = { genRandomInt };
