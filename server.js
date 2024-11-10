const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Path to the data.json file
const dataPath = path.join(__dirname, 'data', 'data.json');

// Serve static files (video, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get weather data from data.json
app.get('/weather', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to load weather data' });
        }
        res.json(JSON.parse(data)); // Send JSON data from the file
    });
});

// Serve the index.html page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
