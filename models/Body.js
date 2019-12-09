const bodiesCacheDict = require('../bodies_cache_dict.json');
const { snakecaseName } = require('../lib/format');
const solaire = require('../apis/solaire');

const getBodies = function(args) { 
    return solaire.getBodies()
        .then(res => {
            return res.body.bodies;
        });
}

const getBody = function(args) {
    //sanitize, and search this target 
    const target = args.target;
    return bodiesCacheDict[snakecaseName(target)]
}

module.exports = {
    getBodies,
    getBody
}