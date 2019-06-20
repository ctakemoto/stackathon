// place associations here

const User = require('./User');
const Place = require('./Place');
const Comment = require('./Comment');

module.exports = {
  User,
  Place,
  Comment,
};

User.hasMany(Comment);
Comment.belongsTo(User);

Place.hasMany(Comment);
Comment.belongsTo(Place);
