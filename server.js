const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const api = require('./server/routes/api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));
