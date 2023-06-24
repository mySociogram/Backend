'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      like: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
        defaultValue: [],
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      postId: {
        type: Sequelize.UUID,
        references: {
          model: 'Posts',
          key: 'id',
        },
      },
      communityId: {
        type: Sequelize.INTEGER, // Change the data type to Sequelize.INTEGER
        allowNull: true,
        references: {
          model: 'Communities',
          key: 'id',
        },
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

    await queryInterface.addConstraint('Comments', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_comments_userId',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('Comments', {
      fields: ['postId'],
      type: 'foreign key',
      name: 'fk_comments_postId',
      references: {
        table: 'Posts',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('Comments', {
      fields: ['communityId'],
      type: 'foreign key',
      name: 'fk_comments_communityId',
      references: {
        table: 'Communities',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Comments', 'fk_comments_userId');
    await queryInterface.removeConstraint('Comments', 'fk_comments_postId');
    await queryInterface.removeConstraint('Comments', 'fk_comments_communityId');
    await queryInterface.dropTable('Comments');
  },
};
