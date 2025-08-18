import express from 'express';
import { sequelize } from './config/sequelize';
import routes from './routes';
import cors from 'cors';
import './model/user';
import './model/product';
import './model/productComment';
import './model/productReview';
import './model/productImage';

const app = express();
const PORT = 3000;

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT',
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

sequelize.sync({ force: true, logging: console.log })
  .then(() => {
    console.log('Banco sincronizado com Sequelize');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar:', err);
  });
