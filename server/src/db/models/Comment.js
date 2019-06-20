const Sequelize = require('sequelize');
const db = require('../db');

const Comment = db.define('comment', {
  title: {
    type: Sequelize.STRING,
  },
  body: {
    type: Sequelize.TEXT,
  },
});

module.exports = Comment;
