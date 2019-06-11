const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const cloudkitConnect = require('./database/cloudKit').cloudkitConnect;


const app = express();

app.set('views', 'views');

//Routes

const indexRoutes = require('./routes/user');

app.use(bodyParser.urlencoded({extends: false}));
app.use(express.static(path.join(__dirname + 'public')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next()
});

app.use(indexRoutes);

cloudkitConnect( () => {
  app.listen(3000);
});