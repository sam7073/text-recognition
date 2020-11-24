const express = require('express');
const cors = require('cors');
const fs = require('fs');
var bodyParser = require('body-parser');
var Buffer = require('buffer').Buffer;
const PythonShell = require('python-shell').PythonShell;

// python options
const options = {
  mode: 'text',
  pythonPath: 'C:/Users/sam70/anaconda3/envs/capstone/python.exe',
  pythonOptions: ['-u'], // get print results in real-time
};
const app = express();

// express request entity limit expand
app.use(bodyParser.json({limit: 100000000}));
app.use(cors());

// processing user upload
app.post('/upload', (req, res) => {
  fs.writeFile(
    '../image/1.jpg',
    Buffer.from(req.body.img, 'base64'),
    function (err) {
      console.log(err);
    },
  );
  PythonShell.run('text_detection.py', options, (err, results) => {
    console.log(err);
    res.send(results);
  });
});

// Running on 3001 port
app.listen(3001, () => {
  console.log('3001 running');
});
