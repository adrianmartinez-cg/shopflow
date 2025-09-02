import { DataTypes, Model, Sequelize, type ModelStatic } from 'sequelize';
import { v7 as uuidv7 } from 'uuid';

export class ProductReview extends Model {
  public id!: string;
  public rating?: number;
  public comment?: string;
  public userId!: string;
  public productId!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  public static associate(models: { [key: string]: ModelStatic<Model> }) {
    this.belongsTo(models.Product!, {
      foreignKey: 'productId',
      as: 'product'
    });

    this.belongsTo(models.User!, {
      foreignKey: 'userId',
      as: 'user'
    });
  }
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  ProductReview.init({
    id: {
      type: dataTypes.UUID,
      defaultValue: () => uuidv7(),
      primaryKey: true,
    },
    rating: {
      type: dataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: dataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: dataTypes.UUID,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id',
      }
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
    createdAt: {
      type: dataTypes.DATE,
      allowNull: false,
      field: 'created_at',
    },
    updatedAt: {
      type: dataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
    },
  }, {
    sequelize,
    tableName: 'product_reviews',
    timestamps: true,
    validate: {
      ratingOrCommentRequired() {
        if (this.rating == null && this.comment == null) {
          throw new Error('Review must have at least a rating or a comment');
        }
      }
    }
  });

  return ProductReview;
};