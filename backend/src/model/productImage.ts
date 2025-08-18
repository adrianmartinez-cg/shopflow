import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize';
import { Product } from './product';
import { v7 as uuidv7 } from 'uuid';

export class ProductImage extends Model {
  public id!: string;
  public url!: string;
  public productId!: string;
}

ProductImage.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv7(),
    primaryKey: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'product_id',
  },
}, {
  sequelize,
  tableName: 'product_images',
});

Product.hasMany(ProductImage, { foreignKey: 'product_id', as: 'images' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id' });
