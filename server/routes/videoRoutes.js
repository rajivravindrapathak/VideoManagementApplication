const express = require('express');
const multer = require('multer');
const Video = require('../models/Video');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Upload Video
router.post('/upload', authMiddleware, upload.single('video'), async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        const newVideo = new Video({
            user: req.user.userId,
            title,
            description,
            tags: tags.split(','),
            filePath: req.file.path,
            fileSize: req.file.size
        });
        await newVideo.save();
        res.status(201).json(newVideo);
    } catch (error) {
        res.status(500).json({ error: "Error uploading video" });
    }
});

// Get User Videos with Pagination & Filtering
router.get('/', authMiddleware, async (req, res) => {
    try {
        const { title, tags, page = 1, limit = 5 } = req.query;
        const query = { user: req.user.userId };

        if (title) query.title = new RegExp(title, 'i');
        if (tags) query.tags = { $in: tags.split(',') };

        const videos = await Video.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json(videos);
    } catch (error) {
        res.status(500).json({ error: "Error fetching videos" });
    }
});

module.exports = router;
