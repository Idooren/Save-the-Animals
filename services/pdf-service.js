
const PDFDocument = require('pdfkit');
const fs = require('fs');

function buildAnimalsPDF(animals, filename = 'SaveTheAnimals.pdf') {
    const doc = new PDFDocument;
    doc.pipe(fs.createWriteStream(filename));
    animals.map((animal, idx) => {
        doc.image(`${animal.name}.png`, 100, 200 * idx, {
            fit: [250, 300],
            align: 'center',
            valign: 'center'
        });
    });

    doc.end();
}

module.exports = {
    buildAnimalsPDF
}
