const express = require("express");
const router = express.Router();
const { createUser, getUser } = require("../controller/userController");

router.post("/", createUser);
router.post("/login", getUser);

module.exports = router;
