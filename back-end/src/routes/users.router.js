const router = require("express").Router();

const UserController = require("../controller/user.controller");

router.post('/sign-up', UserController.signup)
router.post('/sign-in', UserController.signin)

module.exports = router;
