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

    validate(refreshToken) {
        try {
            const data = jwt.verify(refreshToken, config.get("refreshSecret"));
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async findToken(refreshToken) {
        try {
            const data = await Token.findOne({ refreshToken });
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

module.exports = new TokenService();
