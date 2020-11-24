const express = require('express');
const cors = require('cors');
const fs = require('fs');
var bodyParser = require('body-parser');
var Buffer = require('buffer').Buffer;
const PythonShell = require('python-shell').PythonShell;

const options = {
  mode: 'text',
  pythonPath: 'C:/Users/sam70/anaconda3/envs/capstone/python.exe',
  pythonOptions: ['-u'], // get print results in real-time
};

const app = express();

app.use(bodyParser.json({limit: 10000000}));
app.use(cors());

app.get('/data', (req, res) => {
  res.send({name: 'HelloRNC'});
});

app.post('/upload', (req, res) => {
  fs.writeFile(
    '../image/1.jpg',
    Buffer.from(req.body.img, 'base64'),
    function (err) {
      console.log(err);
    },
  );
  PythonShell.run('text_detection.py', options, (err, results) => {
    res.send(results);
  });
});

app.listen(3001, () => {
  console.log('3001 running');
});
