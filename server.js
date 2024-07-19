const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const viewsRouter = require("./routes/viewsRoutes");
const messageRouter = require("./routes/messageRoutes");
const productRouter = require("./routes/productRoutes");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const cookieParser = require('cookie-parser');
dotenv.config({ path: "./config.env" });

const app = express();
const PORT = 3000;
const MONGO_URL = process.env.MONGODB_URI;

mongoose.connect(MONGO_URL)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
  process.exit(1);
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.set("view engine", "ejs");
app.use("/", viewsRouter);
app.use("/", messageRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/products", productRouter);


app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

