require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");
const bookRouter = require("./routes/books");


app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.set("view engine", "ejs");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));


mongoose.set("strictQuery", false);
mongoose.connect(process.env.URL)
    .then(() => app.listen(process.env.PORT, () => console.log("[+] Connected...")))
    .catch((err) => console.log(err));


app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);