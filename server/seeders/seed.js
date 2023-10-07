const connectDB = require('../config/connection');
const { User, Destination } = require('../models'); 
const userSeeds = require('./userSeeds.json');
const destinationSeeds = require('./destinationSeeds.json'); 
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await connectDB(); 

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
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});

