const mongoose = require('mongoose')
require("dotenv").config()

const db = process.env.db

mongoose.connect(db)
.then(() => {
    console.log('Connection to database established successfully');
})
.catch((error) => {
    console.log('Error connecting to database: ' + error.message);
})