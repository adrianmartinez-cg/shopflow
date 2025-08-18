import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize';
import { Product } from './product';
import { v7 as uuidv7 } from 'uuid';
import { User } from './user';

export class ProductReview extends Model {
  public id!: string;
  public rating!: number;
  public comment!: string;
  public userId!: string;
  public productId!: string;
}

ProductReview.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv7(),
    primaryKey: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id'
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'product_id'
  },
}, {
  sequelize,
  tableName: 'product_reviews',
});

Product.hasMany(ProductReview, { foreignKey: 'product_id', as: 'productReviews' });
ProductReview.belongsTo(Product, { foreignKey: 'product_id' });

User.hasMany(ProductReview, { foreignKey: 'user_id', as: 'userReviews' });
ProductReview.belongsTo(User, { foreignKey: 'user_id' });
