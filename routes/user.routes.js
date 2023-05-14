const express = require("express");
const router = express.Router();
const { createUser, getUser } = require("../controller/userController");

router.post("/", createUser);
router.get("/", getUser);

module.exports = router;
