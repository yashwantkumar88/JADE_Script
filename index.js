var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//Connect to MongoDB MLAb
mongoose.connect('mongodb://yashwant.kumar:9017526888Y@ds033400.mlab.com:33400/jade', { useNewUrlParser: true });

//express object
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Handle requests
app.use('/',require('./routes'));

//listen
app.listen(process.env.PORT || 3001);
console.log('Server is up and running');