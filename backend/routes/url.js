const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');
const Url = require('../models/Url');

// POST /api/shorten - create short URL
router.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    if (!originalUrl) return res.status(400).json({ message: 'originalUrl is required' });

    try {
        let existing = await Url.findOne({ originalUrl });
        if (existing) {
            return res.json({
                shortCode: existing.shortCode,
                shortUrl: `${process.env.BASE_URL}/${existing.shortCode}`
            });
        }

        const shortCode = nanoid(7);
        const newUrl = new Url({ originalUrl, shortCode });
        await newUrl.save();

        res.json({ shortCode, shortUrl: `${process.env.BASE_URL}/${shortCode}` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/urls - list all URLs
router.get('/urls', async (req, res) => {
    try {
        const urls = await Url.find().sort({ createdAt: -1 });
        res.json(urls);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
