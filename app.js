const express = require('express')
var path = require('path');
const app = express()
const port = 3000

app.use('/styles', express.static('public/styles'));
app.use('/scripts', express.static('public/scripts'));
app.use('/images', express.static('public/images'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/create.html'));
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})