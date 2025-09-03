"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("product_images", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        field: "product_id",
        onDelete: "CASCADE",
      },
      createdAt: { type: Sequelize.DATE, field: "created_at" },
      updatedAt: { type: Sequelize.DATE, field: "updated_at" },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("product_images");
  },
};
