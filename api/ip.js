module.exports = (req, res) => {
    res.json({ ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress });
};
