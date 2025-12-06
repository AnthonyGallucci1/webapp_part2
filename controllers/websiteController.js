const Website = require('../models/Website');

// Get all websites
exports.getAllWebsites = async (req, res) => {
    try {
        const websites = await Website.find().populate('createdBy', 'username');
        res.json(websites);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get website by ID
exports.getWebsiteById = async (req, res) => {
    try {
        const website = await Website.findById(req.params.id).populate('createdBy', 'username');
        if (!website) {
            return res.status(404).json({ msg: 'Website not found' });
        }
        res.json(website);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Website not found' });
        }
        res.status(500).send('Server Error');
    }
};

// Create new website
exports.createWebsite = async (req, res) => {
    const { name, url, riskLevel, isProtected } = req.body;

    try {
        const newWebsite = new Website({
            name,
            url,
            riskLevel,
            isProtected,
            createdBy: req.user.id
        });

        const website = await newWebsite.save();
        res.json(website);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update website
exports.updateWebsite = async (req, res) => {
    const { name, url, riskLevel, isProtected } = req.body;

    // Build website object
    const websiteFields = {};
    if (name) websiteFields.name = name;
    if (url) websiteFields.url = url;
    if (riskLevel) websiteFields.riskLevel = riskLevel;
    if (isProtected !== undefined) websiteFields.isProtected = isProtected;

    try {
        let website = await Website.findById(req.params.id);

        if (!website) return res.status(404).json({ msg: 'Website not found' });

        website = await Website.findByIdAndUpdate(
            req.params.id,
            { $set: websiteFields },
            { new: true }
        );

        res.json(website);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete website
exports.deleteWebsite = async (req, res) => {
    try {
        let website = await Website.findById(req.params.id);

        if (!website) return res.status(404).json({ msg: 'Website not found' });

        await Website.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Website removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
