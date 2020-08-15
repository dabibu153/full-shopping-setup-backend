const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const products = require("./products");
const users = require("./users");
const cart = require("./cart");

mongoose
  .connect("mongodb://localhost/shopping-db")
  .then(() => console.log("connected to server...."))
  .catch((err) => console.log(err.message));

app.use(express.json());
const corsOptions = {
  exposedHeaders: "auth_token",
};

app.use(cors(corsOptions));

app.use("/api/products", products);
app.use("/api/users", users);
app.use("/api/cart", cart);

app.listen((PORT = 5000), console.log("server started at 5000"));
