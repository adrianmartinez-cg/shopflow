// models/product.ts
import { DataTypes, Model, type ModelStatic, Sequelize } from "sequelize";
import { v7 as uuidv7 } from "uuid";

export class Product extends Model {
  public static associate(models: { [key: string]: ModelStatic<Model> }) {
    this.hasMany(models.ProductImage!, {
      foreignKey: "productId",
      as: "images",
    });

    this.hasMany(models.ProductReview!, {
      foreignKey: "productId",
      as: "reviews",
    });
  }
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  Product.init(
    {
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
      },
      createdAt: {
        type: dataTypes.DATE,
        allowNull: false,
        field: "created_at",
      },
      updatedAt: {
        type: dataTypes.DATE,
        allowNull: false,
        field: "updated_at",
      },
    },
    {
      sequelize,
      tableName: "products",
      timestamps: true,
    },
  );

  return Product;
};
