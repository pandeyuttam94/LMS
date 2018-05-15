var express = require('express');
var app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const path = require('path')
app.use('/', require('./routes/api').route)
var port = Number(process.env.PORT || 5555);
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});