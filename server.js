const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))

});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        // console.log(data);
        res.json(JSON.parse(data));
    });
});

// app.post('/api/notes', (req, res) => {
//     const noteArray = [];
//     let newNote = req.body;
//     noteArray.push(newNote);
//     console.log(noteArray);
//     res.json(noteArray);
//     // console.log(newNote);
// });




app.listen(PORT, () => {
    console.log('We are listening on http://localhost:' + PORT);
});