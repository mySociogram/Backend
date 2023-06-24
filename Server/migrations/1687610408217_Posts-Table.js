'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID, // Change the data type to Sequelize.UUID
        allowNull: true, // Change to allowNull: true if necessary
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      images: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      communityId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      likes: {
        type: Sequelize.ARRAY(Sequelize.JSONB),
        allowNull: true,
        defaultValue: [],
      },
      comments: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
        defaultValue: [],
      },
      flags: {
        type: Sequelize.ARRAY(Sequelize.JSONB),
        allowNull: true,
        defaultValue: [],
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint('Posts', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_posts_userId',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Posts', 'fk_posts_userId');
    await queryInterface.dropTable('Posts');
  }
};
