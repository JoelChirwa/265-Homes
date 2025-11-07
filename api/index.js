import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB!');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const app = express();

app.use(express.json());

// Routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

app.listen(3000, () => {
  console.log('API server is running on port 3000');
});

export default app;