const express = require('express');
const cors = require('cors');
const fs = require('fs');
var bodyParser = require('body-parser');
var Buffer = require('buffer').Buffer;

const app = express();

app.use(bodyParser.json({limit: 5000000}));
app.use(cors());

app.get('/data', (req, res) => {
  console.log('asd');
  res.send({name: 'HelloRNC'});
});

app.post('/upload', (req, res) => {
  console.log('asd');
  fs.writeFile(
    './image/1.jpg',
    Buffer.from(req.body.img, 'base64'),
    function (err) {
      console.log(err);
    },
  );
  res.send('강아지');
});

app.listen(3001, () => {
  console.log('3001 running');
});
