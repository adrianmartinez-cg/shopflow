"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      hashedPassword: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "hashed_password",
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: "user",
      },
      createdAt: { type: Sequelize.DATE, field: "created_at" },
      updatedAt: { type: Sequelize.DATE, field: "updated_at" },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
