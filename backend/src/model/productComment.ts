import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize';
import { Product } from './product';
import { v7 as uuidv7 } from 'uuid';
import { User } from './user';

export class ProductComment extends Model {
  public id!: string;
  public text!: string;
  public userId!: string;
  public productId!: string;
}

ProductComment.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv7(),
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
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
  tableName: 'product_comments',
});

Product.hasMany(ProductComment, { foreignKey: 'product_id', as: 'productComments' });
ProductComment.belongsTo(Product, { foreignKey: 'product_id' });

User.hasMany(ProductComment, { foreignKey: 'user_id', as: 'userComments' });
ProductComment.belongsTo(User, { foreignKey: 'user_id' });