const express = require("express");
const app = express();
const Database = require("./config/db");
require("dotenv").config();
const bodyParser = require("body-parser");
const UserRoute = require("./routes/user.route");
const DealsRoute = require("./routes/deals.route");
const Category = require("./routes/category.route");
const ReviewRoutes = require("./routes/review.route");
const CartRouter = require("./routes/cart.route");
const adminCheck = require("./middlewares/adminCheck.middleware");
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Home Route
app.get("/", async (req, res) => {
  res.send("Connected...");
});

// this is all Routes:
app.use("/api/users", UserRoute);

// this route only access admins and they are do CRUD Operations..
app.use("/api/deals", adminCheck, DealsRoute);

app.use("/api/reviews", ReviewRoutes);

// this route for categories
app.use("/api/categories", Category);



app.use("/api/cart", CartRouter);

app.listen(port, async () => {
  try {
    await Database();
    console.log(`Server is running on port ${port} `);
  } catch (error) {
    console.log(first);
  }
});
