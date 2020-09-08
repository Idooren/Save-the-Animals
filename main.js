
const FileService = require('./services/file-service.js');
const ImgService = require('./services/img-service');
const PDFService = require('./services/pdf-service');


// TODO: for every animal you shoud call the ImgService.suggestImgs,
// when you get back a response, store it in the animal object
// then return a promise that resolved when ALL img urls are set.

FileService.loadCSV('./rareAnimals.csv')
    .then(animals => {

        console.log(animals);
        const prms = animals.map((animal) => {
            return ImgService.suggestImgs(animal.name);
        });
        return Promise.all(prms)
            .then(res => {
                animals.map((animal, idx) => {
                    animal.imgUrl = res[idx];
                })
                console.log(animals);
                return Promise.resolve(animals);
            })
    })


    // TODO: For each animal, for each of his imgUrl, download the file
    // then return a promise that resolved when ALL imgs were downloaded.

    .then(animalsWithImgUrls => {
        // console.log('animalsWithImgUrls', animalsWithImgUrls);
        var prms = animalsWithImgUrls.map((animal) => {
            return FileService.download(animal.imgUrl, `${animal.name}.png`);
        });
        return Promise.all(prms)
            .then(res => {
                // console.log(res);
                return Promise.resolve(animalsWithImgUrls);
            });
    })


    // TODO: Use the PDFService to build the animals

    .then(animalsWithImgs => {
        console.log('animalsWithImgs', animalsWithImgs);
        PDFService.buildAnimalsPDF(animalsWithImgs);
    });
