import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
export const sequelize = new Sequelize(process.env.SHOPFLOW_DB ?? '', process.env.SHOPFLOW_DB_USER ?? '', process.env.SHOPFLOW_DB_PASSWORD ?? '', {
  host: 'localhost',
  dialect: 'mysql',
});