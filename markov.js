/** Textual markov chain generator */
class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const chain = {};

    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i];
      const nextWord = this.words[i + 1] || null;

      // Check if the word is already a key in the chain
      if (chain[word]) {
        chain[word].push(nextWord); // Add the next word to the array of options
      } else {
        chain[word] = [nextWord]; // Initialize with the next word in the array
      }
    }
    return chain;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    const chain = this.makeChains();  // Get the chain of words
    const words = Object.keys(chain); // Get the list of starting words
    let word = words[Math.floor(Math.random() * words.length)]; // Pick a random starting word
    let text = [word]; // Initialize text with the starting word
    let wordCount = 1;

    // Return an empty string if numWords is 0
    if(numWords === 0) {
      return ""; 
    }

    while (wordCount < numWords) {
      const nextWords = chain[word];

      // If no next words or next word is null, stop generating
      if (!nextWords || nextWords.length === 0) break;

      // Pick a random word from nextWords
      word = nextWords[Math.floor(Math.random() * nextWords.length)];

      // If we hit the end (null), stop
      if (word === null) break;

      // Otherwise, add the new word to the text and increment word count
      text.push(word);
      wordCount++;
    }

    return text.join(' ');
  }
}

module.exports = MarkovMachine;
