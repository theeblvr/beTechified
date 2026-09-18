const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { error } = require('console');

dotenv.config({path: path.join(__dirname, '..', '.env') });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.post("/user", (req, res) => {
    const {name, email} = req.body;
    if (!name || !email) {
        return res.status(400).json({error: "Name and email are required"});
    }
    res.json({message: `Hello, ${name}!`})
});

app.get("/user/:id", (req, res) => {
    const { id } = req.params;
    res.send(`User ${id} profile`);
});

app.use((req, res) => {
    res.status(404).json({error: "Route not found",});

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});