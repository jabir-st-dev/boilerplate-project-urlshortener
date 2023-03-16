const express = require('express');
const dns = require("dns");
const router = express.Router();

const url_database = require('../database/');

router.post('/', function (req, res) {
    const urlObject = new URL(req.body.url);

    const original_url = urlObject.origin;

    // console.log({original_url})

    dns.lookup(urlObject.hostname, async function (err, address, family) {
        if (err) {
            res.json({error: 'invalid url'});
        } else {
            const url = await url_database.add({original_url});

            // console.log({url});
            return res.json(url);
        }
    });
});

router.get('/:short_url', async function (req, res) {
    const short_url = req.params.short_url;
    const url = await url_database.get({short_url})
    // console.log({url})
    res.redirect(url)
});

module.exports = router;