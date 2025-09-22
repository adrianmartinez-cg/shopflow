import { DataTypes, Model, Sequelize, type ModelStatic } from "sequelize";
import { v7 as uuidv7 } from "uuid";

export class ProductImage extends Model {
  public static associate(models: { [key: string]: ModelStatic<Model> }) {
    this.belongsTo(models.Product!, {
      foreignKey: "productId",
      as: "product",
    });
  }
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  ProductImage.init(
    {
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
        field: "product_id",
        references: {
          model: "products",
          key: "id",
        },
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
      tableName: "product_images",
      timestamps: true,
    },
  );

  return ProductImage;
};
