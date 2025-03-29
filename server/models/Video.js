const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    tags: [String],
    filePath: { type: String, required: true },
    fileSize: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Video", VideoSchema);
