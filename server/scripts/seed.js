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
  {
    username: 'eman',
    email: 'ethan@gmail.com',
    password: '1234',
    googleId: '',
    name: 'Ethan',
    isAdmin: false,
  },
  {
    username: 'tegs',
    email: 'tegs@gmail.com',
    password: '1234',
    googleId: '',
    name: 'Yuya',
    isAdmin: false,
  },
];

const placeData = [
  {
    name: 'Fullstack Academy',
    address: '5 Hanover Square, 25th Floor',
    latitude: 40.705450817990055,
    longitude: -74.00917347517144,
    singleStall: 'No',
    autoFush: 'No',
    genderNeutral: 'Yes',
    hasLedge: 'No',
    isFree: 'No',
    cleanliness: 'Good',
  },
  {
    name: 'Newport Mall',
    address: '5 Hanover Square',
    latitude: 40.727019,
    longitude: -74.037536,
    singleStall: 'No',
    autoFush: 'Yes',
    genderNeutral: 'Yes',
    hasLedge: 'No',
    isFree: 'Yes',
    cleanliness: 'Okay',
  },
];

const commentData = [
  {
    title: 'I like this bathroom',
    body: 'I went here on 2019/05/03 and it was clean',
    placeId: 1,
  },
  {
    title: 'I hate this bathroom',
    body: 'The toilet always autoflushes on me',
    placeId: 2,
    userId: 1,
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

  for (let i = 0; i < commentData.length; i++) {
    await db.models.comment.create(commentData[i]);
  }

  console.log(`seeded ${usersData.length} users`);
  console.log(`seeded ${placeData.length} places`);
  console.log(`seeded ${commentData.length} comments`);
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
