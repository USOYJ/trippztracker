const db = require('../config/connection');
const { User, Destination } = require('../models'); // Corrected import
const userSeeds = require('./userSeeds.json');
const destinationSeeds = require('./destinationSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Destination', 'destinations');
    await cleanDB('User', 'users');

    await User.create(userSeeds);

    for (let i = 0; i < destinationSeeds.length; i++) {
      const { _id, departure } = await Destination.create(destinationSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: departure }, 
        {
          $addToSet: {
            destinations: _id,
          },
        }
      );
    }

    console.log('Data seeding completed!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
});
