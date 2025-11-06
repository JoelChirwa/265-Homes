import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import userRoute from './routes/user.route.js';

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB!');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const app = express();

// Routes
app.use('/api/users', userRoute);

app.listen(3000, () => {
  console.log('API server is running on port 3000');
});

export default app;