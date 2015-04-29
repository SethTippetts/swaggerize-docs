'use strict';

var path = require('path');
var http = require('http');
var express = require('express');
var swaggerize = require('swaggerize-express');
var docs = require('../../');
var bodyParser = require('body-parser');
var app = express();
var server = http.createServer(app);

app.use(bodyParser.json());

docs(path.join(__dirname, 'docs'))
  .then(function (api) {

    app.use(swaggerize({
      api: api,
      docspath: '/api-docs',
      handlers: './routes'
    }));

    server.listen(8000, function () {
      console.log('server started');
    });

  })
  .catch(function (err) {
    // Swagger validation errors will show up here
    console.log(err);
  });