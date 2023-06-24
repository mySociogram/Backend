'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Communities', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      walletId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      communityName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      about: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      users: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      token: {
        type: Sequelize.INTEGER, // Add the token column as INTEGER
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Communities');
  },
};
