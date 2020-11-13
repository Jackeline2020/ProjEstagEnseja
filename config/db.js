
const mongoose = require('mongoose');
let database_url = 'mongodb://127.0.0.1:27017/ensejadb';

// Connecting to the database
mongoose.connect(database_url, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

module.exports = mongoose.connection;