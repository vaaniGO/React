const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Vaani@123',
  database: 'tweet_app',
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected...');
});

// Route to get all tweets
app.get('/api/tweets', (req, res) => {
  db.query('SELECT * FROM tweets ORDER BY timestamp DESC', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Route to post a new tweet
app.post('/api/tweets', (req, res) => {
  const { text } = req.body;
  const timestamp = new Date();

  db.query(
    'INSERT INTO tweets (text, timestamp) VALUES (?, ?)',
    [text, timestamp],
    (err, result) => {
      if (err) throw err;
      res.json({ id: result.insertId, text, timestamp });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
