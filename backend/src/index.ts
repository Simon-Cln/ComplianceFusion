import * as express from 'express';
import * as cors from 'cors';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { regulationRoutes } from './routes/regulations';
import { userRoutes } from './routes/users';
import { assessmentRoutes } from './routes/assessments';

dotenv.config();

const app = express.default();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors.default());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/regulations', regulationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/assessments', assessmentRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cyber-reglementation')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
