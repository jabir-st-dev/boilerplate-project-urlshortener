const urls = {};

exports.add = function ({ original_url , short_url}) {
    console.log({original_url: urls[short_url]});
    if(urls[short_url] === undefined){
        urls[short_url] = original_url;

        return { original_url , short_url};
    }

    return { original_url , short_url};
};

exports.get = function ({short_url}) {
    return urls[short_url];
}