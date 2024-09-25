// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Set up SQLite database
const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        db.run('CREATE TABLE todos (id TEXT PRIMARY KEY, text TEXT)', (err) => {
            if (err) {
                console.error(err.message);
            }
        });
    }
});

// Get all todos
app.get('/todos', (req, res) => {
    db.all('SELECT * FROM todos', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Add a new todo
app.post('/todos', (req, res) => {
    const { id, text } = req.body;
    db.run('INSERT INTO todos (id, text) VALUES (?, ?)', [id, text], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ id, text });
        }
    });
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM todos WHERE id = ?', id, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Todo deleted' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
