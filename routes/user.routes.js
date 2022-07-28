const express = require("express");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });

router.patch("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        if (userId) {
            const user = await User.findByIdAndUpdate(userId, req.body, {
                //! IMPORTANT wait for changes
                new: true,
            });
            res.json(user);
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error on server. Try again later.",
        });
    }
});
router.get("/", async (req, res) => {
    try {
        const list = await User.find();
        res.send(list);
    } catch (error) {
        res.status(500).json({
            message: "Error on server. Try again later.",
        });
    }
});

module.exports = router;
