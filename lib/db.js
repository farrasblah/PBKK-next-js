import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config(); // Menambahkan dotenv config untuk memuat .env

// Membuat koneksi ke database MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST, // Misal localhost atau IP server database
  user: process.env.DB_USER, // Username database Anda
  password: process.env.DB_PASSWORD, // Password database Anda
  database: process.env.DB_NAME, // Nama database yang akan digunakan
});

// Menghubungkan ke database MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

export default connection;
