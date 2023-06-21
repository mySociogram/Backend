/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
pgm.createTable("community", {
    id:"id",
    userId:{
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    walletId:{
        type: Sequelize.STRING,
        allowNull: false,},
    communityName:{},
    about:{},
    users:{}
})
};

exports.down = pgm => {};
