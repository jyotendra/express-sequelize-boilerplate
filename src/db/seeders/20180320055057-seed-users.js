"use strict";
var bcrypt = require("bcrypt");
var promise = require("bluebird");
var date = new Date();

const saltRounds = 10;

var users = [
  { email: "test1@gmail.com", password: "12345" },
  { email: "test2@gmail.com", password: "12345" },
  { email: "test3@gmail.com", password: "12345" }
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    const allUsers = [];
    users.map(function(user) {
      const hash = bcrypt.hashSync(user.password, saltRounds);
      allUsers.push({
        email: user.email,
        passwordHash: hash,
        createdAt: date.toUTCString(),
        updatedAt: date.toUTCString()
      });
    });
    return queryInterface.bulkInsert("user", allUsers);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};