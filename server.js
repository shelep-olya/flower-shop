const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const viewsRouter = require("./routes/viewsRoutes");
const messageRouter = require("./routes/messageRoutes");
const productRouter = require("./routes/productRoutes");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const cookieParser = require('cookie-parser');
const basicLayout = '../views/layouts/main';
const userLayout = "../views/layouts/admin";
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
app.use(expressLayout);
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use("/", viewsRouter);
app.use("/", messageRouter);
app.use("/users", userRouter);
app.use("/", authRouter);
app.use("/products", productRouter);
app.use("/reviews", reviewRouter);

const setLayout = (req, res, next) => {
  res.locals.layout = req.user ? userLayout :  basicLayout;
  next();
};


app.use(setLayout);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

