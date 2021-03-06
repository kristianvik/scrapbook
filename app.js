const express = require('express');
var path = require('path');
const app = express();
const port = 3000;

app.use('/styles', express.static('public/styles'));
app.use('/scripts', express.static('public/scripts'));
app.use('/images', express.static('public/images'));

app.use(express.static(path.join(__dirname, '/node_modules')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/create.html'));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});

