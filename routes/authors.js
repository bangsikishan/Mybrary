const express = require("express");
const router = express.Router();
const Author = require("../models/author");

// All Authors Route
router.get("/", async (req, res) => {
    const searchOptions = {};

    if(req.query.name != null && req.query.name != "") {
        searchOptions.name = new RegExp(req.query.name, "i");
    }
    
    try {
        const data = await Author.find(searchOptions);
        res.render("authors/index", { authors: data, searchOptions: req.query });
    }
    catch(err) {
        res.render("/");
    }
});

// New Author Route
router.get("/new", (req, res) => {
    res.render("authors/new", { author: new Author() });
});

// Create Author Route
router.post("/", async (req, res) => {
    const author = new Author({
        name: req.body.name
    });

    try {
        const data = await author.save();
        // res.redirect(`/authors/${data.id}`);
        res.redirect(`/authors`);
    }
    catch(err) {
        res.render("/author/new", { author: author, err: err });
    }
});

module.exports = router;