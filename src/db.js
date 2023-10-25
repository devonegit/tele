const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.URI;
const dbconnect = () => {
    mongoose.connect(uri)
    .then(() => {
        console.log('database connected successfully');
    })
    .catch((error) => {
        console.log(error.message);
    })
}
module.exports = dbconnect