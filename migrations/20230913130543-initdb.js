"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("images", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      title: { type: Sequelize.DataTypes.STRING },
      url: { type: Sequelize.DataTypes.STRING },
    });

    await queryInterface.createTable("videos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      title: { type: Sequelize.DataTypes.STRING },
      text: { type: Sequelize.DataTypes.STRING },
    });

    await queryInterface.createTable("comments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      title: { type: Sequelize.DataTypes.STRING },
      commentableId: { type: Sequelize.DataTypes.INTEGER },
      commentableType: { type: Sequelize.DataTypes.STRING },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("images");
    await queryInterface.dropTable("videos");
    await queryInterface.dropTable("comments");
  },
};
