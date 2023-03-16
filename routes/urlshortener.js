const express = require('express');
const dns = require("dns");
const router = express.Router();

const url_database = require('../database/url');

router.post('/', function (req, res) {
    const original_url = req.body.url;

    console.log(original_url);

    const isValidUrl = urlString=> {
        const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
            '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
        return !!urlPattern.test(urlString);
    }

    if(isValidUrl(original_url)) {
        const domain = original_url.split('www.')[1].split('/')[0];

        console.log({domain});
        const short_url = Math.floor(Math.random() * 100000).toString();

        const url = url_database.add({ original_url , short_url});

        console.log({url});

        return res.json(url);
    } else {
        return res.json({ error: 'invalid url' });
    }
});

router.get('/:short_url', function (req, res) {
    const short_url = req.params.short_url;
    const url = url_database.get({short_url})
    res.redirect(url)
})

module.exports = router;