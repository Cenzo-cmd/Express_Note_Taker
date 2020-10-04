const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

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

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.post('/api/notes', (req, res) => {
    let noteArray = [];
    let newNote = req.body;
    fs.readFile(__dirname + "/db/db.json", "utf-8", (err, data) => {
        if (err) throw err;
        noteArray = JSON.parse(data);
        noteArray.push(newNote);

        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(noteArray), 'utf-8', err => {
            if (err) throw err;
            res.end();
        });
    });
});




app.listen(PORT, () => {
    console.log('We are listening on http://localhost:' + PORT);
});