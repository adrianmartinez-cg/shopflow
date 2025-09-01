import express from 'express';
import { sequelize } from './config/sequelize';
import routes from './routes';
import cors from 'cors';
import path from 'path';
import uploadRoutes from './routes/upload';

const app = express();
const DEFAULT_PORT = 3000;
export const DEFAULT_HOST = "http://localhost:3000"
const PORT = process.env.SERVER_PORT ?? DEFAULT_PORT

const corsOptions = {
  origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',
  methods: 'GET,POST,PUT',
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use('/api', uploadRoutes)
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});