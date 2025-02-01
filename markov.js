/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);  // Split text by spaces, newlines, and carriage returns
    this.words = words.filter(arraywords => arraywords !== "");
    // this.words = words.filter(function(arrywords) {
    //   return arrywords !== "";
    // });// Filter out any empty strings
    this.makeChains();  // Call makeChains to build the Markov chains
  }
  

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let wordChains = new Map();

    for (let i = 0; i < this.words.length; i +=1) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (wordChains.has(word)) wordChains.get(word).push(nextWord);
      else wordChains.set(word, [nextWord]);
    } 

    this.wordChains = wordChains;
  }
  //picks a random element from the array passed to it.

  static randomWordChoice(array){
    return array[Math.floor(Math.random() * array.length)];
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let keys = Array.from(this.wordChains.keys());
    let key = MarkovMachine.randomWordChoice(keys);
    let arrayOfGeneratedWords = [];

    while (arrayOfGeneratedWords.length < numWords && key !== null){
      arrayOfGeneratedWords.push(key);
      key = MarkovMachine.randomWordChoice(this.wordChains.get(key));

    }

    return arrayOfGeneratedWords.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};
