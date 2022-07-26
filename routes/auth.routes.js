const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const { generateUserData } = require("../utils/helpers");
const tokenService = require("../services/token.service");

const router = express.Router({ mergeParams: true });

router.post("/signUp", [
    check("email", "Invalid email").isEmail(),
    check("password", "Password too short").isLength({ min: 8 }),
    async (req, res) => {
        const { email, password } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send({
                error: {
                    message: "Invalid data",
                    code: 400,
                },
                // errors: errors.array(),
            });
        }
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).send({
                    error: {
                        message: "EMAIL_EXISTS",
                        code: 400,
                    },
                });
            }
            const hashedPass = await bcrypt.hash(password, 12);

            const newUser = await User.create({
                ...generateUserData(),
                ...req.body,
                password: hashedPass,
            });

            const tokens = tokenService.generate({ _id: newUser._id });

            await tokenService.save(newUser._id, tokens.refreshToken);

            res.status(201).send({
                ...tokens,
                userId: newUser._id,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error on server. Try again later.",
            });
        }
    },
]);

router.post("/signInWithPassword", async (req, res) => {});

router.post("/token", async (req, res) => {});

module.exports = router;
