const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config({ path: "./config.env" });

const app = express();

const MONGO_URL = process.env.MONGODB_URI;

mongoose.connect(MONGO_URL)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
  process.exit(1);
});


app.use(bodyParser.json());



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

