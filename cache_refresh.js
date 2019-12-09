const fs = require('fs');
const _ = require('lodash');
const bodiesCache = require('./bodies_cache.json');
const { snakecaseName } = require('./utils/format');
const newBodies = {};

_.forEach(bodiesCache.bodies, body => {
    const snakecasedName = snakecaseName(body.englishName);
    newBodies[snakecasedName] = body;
});

// function snakecaseName(name) {
//     return name.replace(/\W+/g, " ").split(/ |\B(?=[A-Z])/).map(word => word.toLowerCase()).join('_');
// }

fs.writeFile("./bodies_cache_dict.json", JSON.stringify(newBodies), err => {
    if(err) {
        return console.log('Error during cache refresh', err);
    }

    console.log("The cache has been refreshed!");
}); 