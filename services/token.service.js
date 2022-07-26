const jwt = require("jsonwebtoken");
const config = require("config");
const Token = require("../models/Token");
class TokenService {
    generate(payload) {
        const accessToken = jwt.sign(payload, config.get("accessSecret"), {
            expiresIn: "1h",
        });
        const refreshToken = jwt.sign(payload, config.get("refreshSecret"));

        return {
            accessToken,
            refreshToken,
            expiresIn: 3600,
        };
    }

    async save(userId, refreshToken) {
        const existingToken = await Token.findOne({ user: userId });
        if (existingToken) {
            existingToken.refreshToken = refreshToken;
            return await existingToken.save();
        }
        const token = await Token.create({ refreshToken, user: userId });

        return token;
    }
}

module.exports = new TokenService();
