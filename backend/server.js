const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'GlowSkin API is running' });
});

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Cache koneksi MongoDB supaya tidak buka koneksi baru di setiap request
// (penting untuk lingkungan serverless seperti Vercel)
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    isConnected = true;
    console.log('MongoDB terhubung');
  } catch (err) {
    console.error('Gagal konek MongoDB:', err);
  }
}

// Middleware: pastikan DB connect sebelum proses request apapun
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

const PORT = process.env.PORT || 5000;

// Hanya jalankan app.listen() saat development lokal, bukan di Vercel
if (process.env.NODE_ENV !== 'production') {
  connectDB();
  app.listen(PORT, () => console.log(`Server jalan di port ${PORT}`));
}

module.exports = app;