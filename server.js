//Backend server for frequency computation

// Require express
const express = require('express');

// Require fetch
const fetch = require('node-fetch');

// Create an app variable using express
const app = express();

// Enable CORS
const cors = require('cors');

let corsOptions = {
  origin: 'http://localhost:4200',
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));


// Frequency Computation
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

// Split text file into words
function textToWords(text) {

  // Convert text to words (removes numbers, spaces, tabs, nextLineCharacter and special characters mentioned  in regex)
  const words = text.split(/[.,@:_;?\/\(\)\t\n"<>0-9– ]/);
  
  return frequencyComputation(words);
}

// Fetch text file
function readTextFile(link) {
  return fetch(link)
    .then(response => response.text())
    .then(body =>  textToWords(body))
    .catch(error => console.error(error));
}

// Receive request, process data and send words as per userInput
app.get('/api/words/:userInput', (request, response) => {
  readTextFile('http://terriblytinytales.com/test.txt')
    .then(result => {
      response.send(result.slice(0, request.params.userInput));
    });
});

app.listen(8000, () => {
  console.log('App listening on port 8000!');
});
