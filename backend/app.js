const express = require('express')
const LoremIpsum = require("lorem-ipsum").LoremIpsum;


const app = express()
const cors = require('cors')
const config = { port: process.env.PORT || 3000 }

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

lorem.generateWords(1);
lorem.generateSentences(5);
lorem.generateParagraphs(7);

// middleware
app.use(cors())


// API route for generating lorem ipsum text
app.get('/lorem', (req, res) => {
  // Generate lorem ipsum text
  const loremText = lorem.generateSentences(5);

  // Send the text in a JSON object
  res.json({ lorem: loremText });
});
 

app.get('*', function (req, res) {
  res.status(404).json({ error: 'route not found' })
})


// start server
app.listen(config.port, () => {
  console.log(`App listening at http://localhost:${config.port}`)
})
