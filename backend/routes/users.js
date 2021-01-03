const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const SharedController = require("../controllers/shared");
const UserController = require("../controllers/user");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(SharedController.Headers);

router.post("/signup", UserController.createUser)
router.post("/login", UserController.userLogin)

module.exports = router;
