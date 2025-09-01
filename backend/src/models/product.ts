// models/product.ts
import { DataTypes, Model, Sequelize } from 'sequelize';
import { v7 as uuidv7 } from 'uuid';

export class Product extends Model {
  public id!: string;
  public name!: string;
  public description?: string;
  public price!: string;
  public tags?: string;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  Product.init({
    id: {
      type: dataTypes.UUID,
      defaultValue: () => uuidv7(),
      primaryKey: true,
    },
    name: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: dataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: dataTypes.DECIMAL(13, 4),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    tags: {
      type: dataTypes.TEXT,
      allowNull: true,
    }
  }, {
    sequelize,
    tableName: 'products',
    timestamps: true,
  });

  return Product;
};