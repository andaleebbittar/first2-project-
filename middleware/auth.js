const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const sequelize = require("../utils/connect");
const user = require("../models/user.model");
const JWT_SECRET = "qwertyuiopsdfghjkl";

const authMiddleware = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) throw Error("wrong token..! please try again ");

        if (token.startsWith("Bearer ")) token = token.replace("Bearer ", "");

        const decoded = jwt.verify(token, JWT_SECRET);
        const foundUser = await user.findOne({
            where: { username: decoded.username },
        });

        if (!foundUser) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                error: "التوكن غير صحيح",
            });
        }

        req.user = foundUser;

        next();
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: error.message,
        });
    }
};

module.exports = authMiddleware;
