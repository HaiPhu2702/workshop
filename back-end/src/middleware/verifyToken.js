const jwt = require("jsonwebtoken");

const config = require("../config/setting");
const throwError = require("./throwError");

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return next(throwError(401, "you are not authentication"));
    await jwt.verify(token, config.secretKey, (err, user) => {
        if (err) return next(throwError(403, "failed to verify token"));
        req.user = user;
        next();
    })
}

module.exports = verifyToken
