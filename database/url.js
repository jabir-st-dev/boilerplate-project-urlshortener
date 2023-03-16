const shortUrls = {};
const urls = {};

exports.add = function ({original_url}) {
    console.log({original_url: urls[original_url]});

    if (urls[original_url] === undefined) {
        let short_url = Math.floor(Math.random() * 100000).toString();

        while (shortUrls[short_url] !== undefined) {
            short_url = Math.floor(Math.random() * 100000).toString();
        }

        shortUrls[short_url] = original_url;
        urls[original_url] = short_url;

        return {original_url, short_url};
    } else {
        return {original_url, short_url: urls[original_url]}
    }
};

exports.get = function ({short_url}) {
    return shortUrls[short_url];
}