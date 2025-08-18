import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize';
import { v7 as uuidv7 } from 'uuid';

export class Product extends Model {
  public id!: string;
  public name!: string;
  public description!: string;
}

Product.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv7(),
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(13,4),
    allowNull: false,
    validate: {
      min: 0,
    },
  }
}, {
  sequelize,
  tableName: 'products',
  timestamps: true,
});
