const mongoose = require('mongoose');

/**
 * Connect to MongoDB (Atlas or self-hosted). Server should not accept traffic until this succeeds.
 */
async function connectDB() {
  const uri = process.env.MONGODB_URI.trim();

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10_000,
      maxPoolSize: 10,
    });

    const { host } = conn.connection;
    console.log(`✅ MongoDB connected: ${host}`);

    const User = require('../models/User');
    await User.syncIndexes();
    console.log('✅ User collection indexes synced');

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB error:', err.message);
    });

    return conn;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    throw error;
  }
}

module.exports = connectDB;
