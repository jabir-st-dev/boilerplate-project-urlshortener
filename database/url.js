const shortUrls = {};
const urls = {};
let i = 1

exports.add = function ({original_url}) {
    console.log({givenURL: urls[original_url]});

    if (urls[original_url] === undefined) {
        let short_url = i++;

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