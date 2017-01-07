var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var routes = require('./routes');
require('dotenv').config(); //dotenv package
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

routes(app);

app.listen(process.env.PORT || 5000, () => {
  console.log('running on port ' + process.env.PORT || 5000);
});
