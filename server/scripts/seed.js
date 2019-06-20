'use strict';

const db = require('../src/db');

const usersData = [
  {
    username: 'cara.t',
    email: 'cara@gmail.com',
    password: '1234',
    googleId: '',
    name: 'Cara',
    isAdmin: true,
  },
];

const placeData = [
  {
    name: 'Fullstack Academy',
    address: '5 Hanover Square',
    latitude: 40.705450817990055,
    longitude: -74.00917347517144,
  },
];

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  for (let i = 0; i < usersData.length; i++) {
    await db.models.user.create(usersData[i]);
  }

  for (let i = 0; i < placeData.length; i++) {
    await db.models.place.create(placeData[i]);
  }

  console.log(`seeded ${usersData.length} users`);
  console.log(`seeded ${placeData.length} users`);
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed(5, 5);
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
