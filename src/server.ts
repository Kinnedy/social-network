import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import thoughtRoutes from './routes/thoughtRoutes';

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

mongoose.connect('mongodb://localhost:27017/socialDB')
  .then(() => {
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch(err => console.error(err));