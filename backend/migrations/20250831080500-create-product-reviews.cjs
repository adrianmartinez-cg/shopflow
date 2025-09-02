'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_reviews', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      comment: Sequelize.TEXT,
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id'
        },
        field: 'user_id',
        onDelete: 'CASCADE'
      },
      productId: {
        type: Sequelize.UUID,
        references: {
          model: 'products',
          key: 'id'
        },
        field: 'product_id',
        onDelete: 'CASCADE'
      },
      createdAt: {type: Sequelize.DATE, field: 'created_at'},
      updatedAt: {type: Sequelize.DATE, field: 'updated_at'}
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product_reviews');
  }
};
