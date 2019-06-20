const Sequelize = require('sequelize');
const db = require('../db');

const Place = db.define('place', {
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
  address: {
    type: Sequelize.STRING,
  },
  latitude: {
    type: Sequelize.DECIMAL(25, 15),
    validate: {
      min: -90,
      max: 90,
    },
  },
  longitude: {
    type: Sequelize.DECIMAL(25, 15),
    validate: {
      min: -180,
      max: 180,
    },
  },
  coordinates: {
    type: Sequelize.ARRAY(Sequelize.DECIMAL),
  },
  singleStall: {
    type: Sequelize.ENUM('Yes', 'No', 'Unknown'),
    defaultValue: 'Unknown',
  },
  autoFlush: {
    type: Sequelize.ENUM('Yes', 'No', 'Unknown'),
    defaultValue: 'Unknown',
  },
  genderNeutral: {
    type: Sequelize.ENUM('Yes', 'No', 'Unknown'),
    defaultValue: 'Unknown',
  },
  hasLedge: {
    type: Sequelize.ENUM('Yes', 'No', 'Unknown'),
    defaultValue: 'Unknown',
  },
  isFree: {
    type: Sequelize.ENUM('Yes', 'No', 'Unknown'),
    defaultValue: 'Unknown',
  },
  cleanliness: {
    type: Sequelize.ENUM('Great', 'Good', 'So-so', 'Fair', 'Unknown'),
    defaultValue: 'Unknown',
  },
});

module.exports = Place;

// Instance Method

Place.prototype.setCoords = function() {
  this.coordinates = [this.latitude, this.longitude];
};

// Hooks

Place.addHook('beforeValidate', place => {
  place.coordinates = [place.latitude, place.longitude];
});
