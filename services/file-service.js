
const csv = require('csv-parser');
const fs = require('fs');
const request = require('request');
const results = [];

function loadCSV(csvFile) {
    return new Promise((resolve, reject) => {
        fs.createReadStream(csvFile)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                console.log(results);
                resolve(results);
            });
    })
}

download ('https://media.istockphoto.com/photos/malayan-tiger-is-walking-towards-viewer-lookig-straight-picture-id637036204?k=6&m=637036204&s=612x612&w=0&h=pDN0g7ftd7U_ct6D0U4zkIisr0PRkj96MRTCS14_0NU=', 'malayan tiger.png')

download( 'https://media.istockphoto.com/photos/mother-and-baby-mountain-gorilla-rwanda-picture-id813199540?k=6&m=813199540&s=612x612&w=0&h=vE5A-lNjBI6mANR_Xsw1fS0qz1GrimOllofbHAk2YxU=','mountain gorilla.png')

download('https://media.istockphoto.com/photos/fin-whale-picture-id514247189?k=6&m=514247189&s=612x612&w=0&h=bkpGcqNvjw95SPR-_09CCeNHDDj_x1XCvghI9YQyrtw=','fin whale.png')

function download(url, fileName) {
    return new Promise((resolve, reject) => {
        request.head(url, (err, res, body) => {
            request(url)
                .pipe(fs.createWriteStream(fileName))
                .on('close', resolve)
                .on('error', reject)
        });
    })
};

module.exports = {
    loadCSV,
    download
}
