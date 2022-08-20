const { default: mongoose } = require("mongoose");
const Blog = require("../model/blogmodel");
const express = require("express");
const authenticate = require("../authenticate/authenticate.js");
const User = require("../model/usermodel");
const { body, validationResult } = require('express-validator');

const router = express.Router();



router.get("", async (req, res, next) => {
    try {

        let blog = await Blog.find({}).populate("user_id")
        return res.send(blog)
    }
    catch (err) {

        return res.send({ message: err })
    }
})

router.get("/:_id", authenticate, async (req, res, next) => {
    try {
    
        console.log(req.params)
        let blog = await Blog.find({ user_id: req.params._id }).lean().exec();

        return res.send(blog)
    }
    catch (err) {

        return res.send({ message: err })
    }
})

router.post("", body('title').isLength({ min: 1 }), body('desc').isLength({ min: 1 }), body('image').isLength({ min: 1 }), authenticate, async (req, res, next) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json({ message: errors });
        }
        let blog = await Blog.create(req.body);
        return res.send(blog)
    }
    catch (err) {
        console.log(err)
        return res.send({ message: err })
    }
})








module.exports = router


