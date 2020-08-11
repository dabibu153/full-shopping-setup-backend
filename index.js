const express = require("express");
const mongoose = require("mongoose");
const app = express();
var cors = require("cors");
const products = require("./routes/products");

mongoose
  .connect("mongodb://localhost/shopping-db")
  .then(() => console.log("connected to server...."))
  .catch((err) => console.log(err.message));

app.use(express.json());
app.use(cors());

app.use("/api/products", products);

app.listen((PORT = 5000), console.log("server started at 5000"));