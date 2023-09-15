"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkInsert(
        "images",
        Array.from({ length: 10 }).map(() => ({
          title: faker.lorem.sentence(3),
          url: faker.internet.url(),
        })),
        { transaction }
      );
      await queryInterface.bulkInsert(
        "videos",
        Array.from({ length: 10 }).map(() => ({
          title: faker.lorem.sentence(3),
          text: faker.lorem.paragraph(2),
        })),
        { transaction }
      );
      await queryInterface.bulkInsert(
        "comments",
        Array.from({ length: 10 }).map((_, i) => ({
          title: faker.lorem.sentence(3),
          commentableId: i + 1,
          commentableType: i % 2 === 0 ? "image" : "video",
        })),
        { transaction }
      );
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("images", null, {});
    await queryInterface.bulkDelete("videos", null, {});
    await queryInterface.bulkDelete("comments", null, {});
  },
};
