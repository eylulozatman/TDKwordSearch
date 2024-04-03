const fs = require('fs').promises;
const mysql = require('mysql2/promise');
const express = require('express');
const app = express();
const config = require('./config');

const cors = require('cors');
app.use(cors());




// Veritabanı bağlantısı
async function connectToDatabase() {
    const pool = mysql.createPool(config.database);
    return pool.getConnection();
}

// Başlangıç harfiyle başlayan kelimeleri getiren API endpoint'i
app.get('/WordsStartWith/:startLetter', async (req, res) => {
    const startLetter = req.params.startLetter;
    try {
        const connection = await connectToDatabase();
        const [rows] = await connection.query('SELECT * FROM words WHERE word LIKE ?', [`${startLetter}%`]);
        connection.release();
        res.json(rows.map(row => row.word));
    } catch (error) {
        console.error('Error fetching words starting with given letter:', error);
        res.status(500).send('An error occurred');
    }
});

// Son harfiyle biten kelimeleri getiren API endpoint'i
app.get('/WordEndWith/:endLetter', async (req, res) => {
    const endLetter = req.params.endLetter;
    try {
        const connection = await connectToDatabase();
        const [rows] = await connection.query('SELECT * FROM words WHERE word LIKE ?', [`%${endLetter}`]);
        connection.release();
        res.json(rows.map(row => row.word));
    } catch (error) {
        console.error('Error fetching words ending with given letter:', error);
        res.status(500).send('An error occurred');
    }
});

// Belirli bir kelimeyi içeren kelimeleri getiren API endpoint'i
app.get('/WordsContains/:substring', async (req, res) => {
    const substring = req.params.substring;
    try {
        const connection = await connectToDatabase();
        const [rows] = await connection.query('SELECT * FROM words WHERE word LIKE ?', [`%${substring}%`]);
        connection.release();
        res.json(rows.map(row => row.word));
    } catch (error) {
        console.error('Error fetching words containing given substring:', error);
        res.status(500).send('An error occurred');
    }
});

// Uygulamayı belirtilen port üzerinden dinlemek
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
/*
async function main() {
  try {
    // Veritabanına bağlan
    const pool = mysql.createPool(config.database);
    const connection = await pool.getConnection();
    console.log('Connected to MySQL database!');

    // Tabloyu oluştur
    await createWordsTable(connection);

    // Dosyayı oku ve kelimeleri veritabanına ekle
     await readAndInsert(connection);

    // Bağlantıyı serbest bırak
    connection.release();

    console.log('All operations completed successfully!');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

async function createWordsTable(connection) {
  try {
    // Tabloyu oluştur (varsa birşey yapma)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS words (
        id INT AUTO_INCREMENT PRIMARY KEY,
        word VARCHAR(255) NOT NULL
      )
    `);
    console.log('Words table created successfully!');
  } catch (error) {
    console.error('Error creating words table:', error);
  }
}

async function readAndInsert(connection) {
  try {
    // Dosyayı oku
    const words = await fs.readFile('words.txt', 'utf8');
    const wordArray = words.split('\n');

    // Kelimeleri veritabanına ekle
    for (const word of wordArray) {
      if (word) {
        await connection.query('INSERT INTO words (word) VALUES (?)', [word]);
      }
    }

    console.log('Words inserted successfully!');
  } catch (error) {
    console.error('Error reading and inserting words:', error);
  }
}

// main fonksiyonunu çağır
//main();
*/

