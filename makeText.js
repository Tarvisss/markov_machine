/** Command-line tool to generate Markov text. */

// Import necessary modules
const fs = require('fs'); // File system module to interact with files
const markov = require('./markov'); // Import the MarkovMachine class from the 'markov' module
const axios = require('axios'); // Axios to make HTTP requests (for reading content from URLs)
const process = require('process'); // Process module for handling process-specific features (like exiting)

// Function to generate text using a Markov machine
function generateText(text) {
    // Create an instance of the MarkovMachine class with the provided text
    let markovMachineInstance = new markov.MarkovMachine(text);

    // Generate random text using the Markov machine and log it to the console
    console.log(markovMachineInstance.makeText());
}

// Function to handle reading text from a file
function makeText(path) {
    // Use fs.readFile to asynchronously read the contents of the file at 'path' with UTF-8 encoding
    fs.readFile(path, "utf8", (error, data) => {
       // If an error occurs while reading the file, log the error and terminate the process
       if (error) {
        console.log(`Cannot read file: ${path}: ${error}`);
        process.kill(1); // Exit the process with a failure status code
       } else {
        // If the file is successfully read, pass its content (data) to generateText function
        generateText(data);
       }
    });
}

// Async function to handle reading text from a URL
async function makeURLText(url) {
    let resp;

    try {
        // Attempt to fetch data from the given URL using axios
        resp = await axios.get(url);
    } catch (err) {
        // If there's an error fetching the URL, log the error and exit the process
        console.error(`Cannot read URL: ${url}: ${err}`);
        process.exit(1); // Exit the process with a failure status code
    }
    // If the URL request is successful, pass the response data (the content of the URL) to generateText function
    generateText(resp.data);
}

/** interpret cmdline to decide what to do. */

// Extract the command-line arguments starting from the 3rd argument onward
let [method, path] = process.argv.slice(2);

// Based on the method passed as the first command-line argument (e.g., 'file' or 'url'), decide what to do
if (method === "file") {
    // If the method is 'file', call makeText() to handle reading from the file at the specified path
    makeText(path);
} else if (method === "url") {
    // If the method is 'url', call makeURLText() to fetch content from the specified URL
    makeURLText(path);
} else {
    // If neither 'file' nor 'url' is specified, print an error message
    console.log("Please specify 'file' or 'url' as the method.");
    process.exit(1); // Exit with an error code
}
