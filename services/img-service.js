
const axios = require('axios');
const cheerio = require('cheerio');

function suggestImgs(term) {
    const api = `http://www.istockphoto.com/il/photos/${term}`;
    return axios.get(api)
        .then(res => {
            const $ = cheerio.load(res.data);
            const imgUrl = $('img.gallery-asset__thumb').attr('src');
            return Promise.resolve(imgUrl);
        });
}

module.exports = {
    suggestImgs,
}
