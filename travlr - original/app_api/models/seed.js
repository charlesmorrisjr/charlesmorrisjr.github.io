// Load the Mongoose connection and the Trip model
const Moongoose = require('./db');
const Trip = require('./travlr');

// Read seed data from the JSON file
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// Delete any existing records, then insert seed data
const seedDB = async () => {
  await Trip.deleteMany({});
  await Trip.insertMany(trips);
}

// Close the MongoDB connection and exit
seedDB().then(async () => {
  await Moongoose.connection.close();
  process.exit(0);
})
