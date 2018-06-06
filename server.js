//Backend server for frequency computation

// Require express
const express = require('express');

//Require path and http
const path = require('path');
const http = require('http');

// Require fetch
const fetch = require('node-fetch');

// Create an app variable using express
const app = express();

/*
// Enable CORS
const cors = require('cors');
// Set corsOptions
let corsOptions = {
  origin: 'http://localhost:4200',
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));
*/


// Sort word-frequency array
function sortArray(frequencyArray) {
  // Sort array in descending order by frequency
  frequencyArray.sort((a, b) => {
    if (a.frequency === b.frequency) {
      return b.word < a.word;
    } else {
      return b.frequency - a.frequency;
    }
  });
  return frequencyArray;
}


// Simple Frequency Computation (only absolute matches)
// This function can be used in place of frequencyComputation present in server.js
// In textToWords function use this function in place of frequencyComputation
function simpleFrequencyComputation(words) {
  const frequencyArray = [];
  const checkedWords = [];
  words.forEach(target => {
    let counter = 0;
    // Remove empty strings created due to split and check if the word has been counted before
    if (!(/^[]*$/.test(target)) && !checkedWords.includes(target.toLowerCase())) {
      words.forEach(word => {
        if (word.toLowerCase() === target.toLowerCase())
          counter++;
      });
      // Make entry to frequency array
      frequencyArray.push({word: target.toLowerCase(), frequency: counter});
      // Push the word in checked words list
      checkedWords.push(target.toLowerCase());
    }
  });
  
  // Sort array and return the result
  return sortArray(frequencyArray);
}


// Frequency Computation. Please read README
// Complex Frequency Computation (absolute match for 1 letter words and include for others)
function frequencyComputation(words) {
  const frequencyArray = [];
  const checkedWords = [];
  words.forEach(target => {
    let counter = 0;
    // Remove empty strings created due to split and check if the word has been counted before
    if (!(/^[]*$/.test(target)) && !checkedWords.includes(target.toLowerCase())) {
      words.forEach(word => {
        // To keep in check the frequency of single letter words like, `i` and `a`
        if (target.length === 1) {
          if (word.toLowerCase() === target.toLowerCase())
            counter++;
        } 
        // Check words with length greater than 1 with regex 
        else {
          let exp = new RegExp(target.toLowerCase(), "g");
          if (word.toLowerCase().includes(target.toLowerCase()))
            counter += word.toLowerCase().match(exp).length;
        }
      });
      // Make entry to frequency array
      frequencyArray.push({word: target.toLowerCase(), frequency: counter});
      // Push the word in checked words list
      checkedWords.push(target.toLowerCase());
    }
  });
  
  // Sort array and return the reuslt
  return sortArray(frequencyArray);
}


/* Split words containing hyphen(-) at positions other than [1].
   This keeps words like `t-shirt`, `e-commerce` untouched.
   But splits words like `cover-letter`, `terribly-tiny-test` */

// This function can be used as an additional split in textToWords function
// Before passing words array to any of the frequency computation functions call this.
// Usage: words = hyphenSplit(words);
function hyphenSplit(words) {
  words.forEach(word => {
    if (word.includes('-') && word[1] != '-') {
      let splitWord = word.split('-');
      // Remove splited word from words array
      words.splice(words.indexOf(word), 1);
      // Add split array to words array
      words = words.concat(splitWord);
    } 
  });

  return words; 
}


// Split text file into words. Please read README
function textToWords(text) {

  // Convert text to words (removes numbers, spaces, tabs, nextLineCharacter and special characters mentioned  in regex)
  let words = text.split(/[.,@:_;?\/\(\)\t\n"<>0-9– ]/);
  // Split words containing hyphen
  words = hyphenSplit(words);

  return frequencyComputation(words);

  // Uncomment next command and comment the last one to get absolute matches for the words
  //return simpleFrequencyComputation(words);
}


// Fetch text file
function readTextFile(link) {
  return fetch(link)
    .then(response => response.text())
    .then(body =>  textToWords(body))
    .catch(error => console.error(error));
}


app.use(express.static(path.join(__dirname, 'dist/frequency-computation')));

// Receive request, process data and send words as per userInput
app.get('/api/words/:userInput', (request, response) => {
  readTextFile('http://terriblytinytales.com/test.txt')
    .then(result => {
      response.send(result.slice(0, request.params.userInput));
    });
});

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname + '/dist/frequency-computation/index.html'));
});

const server = http.createServer(app);

server.listen(process.env.PORT || 8000, () => {
  console.log('App listening!');
});

/* app.listen(8000, () => {
  console.log('App listening on port 8000!');
}); */
