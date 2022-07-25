const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        content: String,
        pageId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
    },
    {
        timestamps: { createdAt: "created_at" },
    }
);

module.exports = model("Comment", schema);
