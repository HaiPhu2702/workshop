const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const throwError = require("../middleware/throwError");
const config = require("../config/setting");
const Users = require("../models/users.model");

class UserController {

    async signup(req, res, next) {
        try {
            const user = await Users.findOne({ name: req.body.name });
            if (user) return next(throwError(404, "User existed!"));
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const newUser = new Users({ ...req.body, password: hash });
            await newUser.save();
            res.status(200).json({ success: true })
        } catch (error) {
            next(error);
        }
    }

    async signin(req, res, next) {
        try {
            console.log(req.body);
            const user = await Users.findOne({ name: req.body.username });
            if (!user) return next(throwError(404, "User not found!"));
            const isPassCorrect = await bcrypt.compare(req.body.password, user.password);
            if (!isPassCorrect) return next(throwError(400, "Wrong Credentials!"));
            const { password, ...othersData } = user._doc
            const token = jwt.sign(othersData, config.secretKey);
            res.status(200).json({ success: true, access_token: token });

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController()
