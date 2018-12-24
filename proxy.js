const express = require('express');
const request = require('request');
const rp = require('request-promise');
const cors = require('cors');
const path = require('path');

const server = express();
const port = process.env.PORT || 3000

server.use(cors());
server.use(express.static(__dirname + '/dist'));

server.listen(port, _ => {
  console.log("Server started on port: " + port);
});

server.get('/proxy', (req, res) => {
  let url = req.query.reqestedURL

  let option = {
    url: url,
    json: true
  }

  rp(option)
    .then((response) => {
      res.json({data: response})
    })
    .catch(err => {
      res.json({
        err: err
      })
    });
})

// server.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/dist/index.html'))
// })
