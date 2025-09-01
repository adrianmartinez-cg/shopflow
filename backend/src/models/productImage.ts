import { DataTypes, Model, ModelCtor, Sequelize } from 'sequelize';
import { v7 as uuidv7 } from 'uuid';

export class ProductImage extends Model {
  public id!: string;
  public url!: string;
  public productId!: string;

  public static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'product'
    });
  }
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  ProductImage.init({
    id: {
      type: dataTypes.UUID,
      defaultValue: () => uuidv7(),
      primaryKey: true,
    },
    url: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    productId: {
      type: dataTypes.UUID,
      allowNull: false,
      field: 'product_id',
      references: {
        model: 'products',
        key: 'id',
      }
    },
  }, {
    sequelize,
    tableName: 'product_images',
    timestamps: true,
  });

  return ProductImage;
};