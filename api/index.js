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
// Enable CORS for the Vite dev server (adjust origin as needed)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH');
    return res.sendStatus(200);
  }
  next();
});

// Routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});

app.listen(3000, () => {
  console.log('API server is running on port 3000');
});

export default app;