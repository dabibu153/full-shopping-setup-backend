const express = require("express");
const mongoose = require("mongoose");
const app = express();
var cors = require("cors");
const products = require("./products");
const users = require("./users");

mongoose
  .connect("mongodb://localhost/shopping-db")
  .then(() => console.log("connected to server...."))
  .catch((err) => console.log(err.message));

app.use(express.json());
app.use(cors());

app.use("/api/products", products);
app.use("/api/users", users);

app.listen((PORT = 5000), console.log("server started at 5000"));
