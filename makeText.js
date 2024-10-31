/** Command-line tool to generate Markov text. */
const MarkovMachine = require('./markov');
const fs = require('fs');
const axios = require('axios');

// Generate text from a file
function generateTextFromFile(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error: Unable to read file at "${path}":\n`, err);
            process.exit(1);
        }
        const mm = new MarkovMachine(data);
        console.log("Generated text from file:\n", mm.makeText());
    });
}

// Generate text from a URL
async function generateTextFromUrl(url) {
    try {
        const res = await axios.get(url);
        const mm = new MarkovMachine(res.data);
        console.log("Generated text from URL:\n", mm.makeText());
    } catch (err) {
        console.error(`Error: Unable to fetch URL "${url}":\n`, err);
        process.exit(1);
    }
}

// Command-line arguments
const fileType = process.argv[2];
const path = process.argv[3];

// Check that both file type and path/URL are provided
if (!fileType || !path) {
    console.error("Usage: node makeText.js [file|url] <file-path|URL>");
    process.exit(1);
}

// Determine whether the input is a file or a URL
if (fileType === "url") {
    generateTextFromUrl(path);
} else if (fileType === "file") {
    generateTextFromFile(path);
} else {
    console.error(`Error: Unknown type "${fileType}". Use "file" or "url".`);
    process.exit(1);
}
