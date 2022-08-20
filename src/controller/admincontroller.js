const express = require("express");
const User = require("../model/usermodel")
const router = express.Router();
const authorization = require("../authorization/authorization");
const authenticate = require("../authenticate/authenticate");





router.get("/allusers", authenticate, authorization("admin"), async (req, res) => {

    try {
        
        let user = await User.find({}).lean().exec();
        
        return res.status(201).send(user)

    }
    catch (err) {

        return res.status(400).send({ err })
    }
})



module.exports = router;