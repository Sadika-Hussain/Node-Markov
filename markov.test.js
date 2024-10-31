const MarkovMachine = require('./markov');

describe("MarkovMachine", () => {

  describe("constructor", () => {
    it("should create an array of words from the input text", () => {
      const mm = new MarkovMachine("the cat in the hat");
      expect(mm.words).toEqual(["the", "cat", "in", "the", "hat"]);
    });

    it("should handle text with extra spaces correctly", () => {
      const mm = new MarkovMachine("   the  cat   in the hat  ");
      expect(mm.words).toEqual(["the", "cat", "in", "the", "hat"]);
    });
  });

  describe("makeChains", () => {
    it("should generate correct Markov chains for simple text", () => {
      const mm = new MarkovMachine("the cat in the hat");
      const expectedChain = {
        "the": ["cat", "hat"],
        "cat": ["in"],
        "in": ["the"],
        "hat": [null]
      };
      expect(mm.makeChains()).toEqual(expectedChain);
    });

    it("should handle repeated words correctly", () => {
      const mm = new MarkovMachine("the cat and the cat");
      const expectedChain = {
        "the": ["cat", "cat"],
        "cat": ["and", null],
        "and": ["the"]
      };
      expect(mm.makeChains()).toEqual(expectedChain);
    });

    it("should handle single-word text", () => {
      const mm = new MarkovMachine("hello");
      const expectedChain = { "hello": [null] };
      expect(mm.makeChains()).toEqual(expectedChain);
    });
  });

  describe("makeText", () => {
    it("should return a string with the specified number of words", () => {
      const mm = new MarkovMachine("the cat in the hat");
      const text = mm.makeText(3);
      expect(text.split(" ").length).toBeLessThanOrEqual(3);
    });

    it("should stop generating text if it reaches the end of the chain", () => {
      const mm = new MarkovMachine("hello world");
      const text = mm.makeText(10);
      expect(text.split(" ").length).toBeLessThanOrEqual(2); // Only two words are possible
    });

    it("should generate realistic random text based on chains", () => {
      const mm = new MarkovMachine("the cat in the hat");
      const text = mm.makeText(50);
      expect(text).toMatch(/^(the|cat|in|hat)( (the|cat|in|hat))*$/);
    });

    it("should handle a numWords value of 0 by returning an empty string", () => {
      const mm = new MarkovMachine("the cat in the hat");
      expect(mm.makeText(0)).toBe("");
    });
  });
});
