const metrics = require('../const/metrics');
const { snakecaseName } = require('./format');
const bodiesCacheDict = require('../bodies_cache_dict.json');

function convertMeticValue(original, target, value) {
    //replace with conversion library, utilizing metics const
    if (original === target) return value;

    const conversionObject = metrics[original];
    const converstionFunction = `to${target.charAt(0).toUpperCase() + target.slice(1)}`;
    const result = value * conversionObject[converstionFunction];
    return result;
}

var getDistance = function(args) { 
    const snakedTargetName = snakecaseName(args.target);
    console.log('the target ----', snakedTargetName);
    console.log('the name ----', snakecaseName(args.target));
    const snakedLocationName = snakecaseName(args.location);
    const target = bodiesCacheDict[snakedTargetName];
    const location = bodiesCacheDict[snakedLocationName];

    const result = parseInt(target.aphelion, 10) - parseInt(location.aphelion, 10);
    const defaultMetric = metrics.bodiesDefaults.aphelion;
    const metric = args.metric || defaultMetric;
    const value = convertMeticValue(defaultMetric, metric, Math.abs(result));

    return {
        value,
        metric
    };
}


module.exports = {
    convertMeticValue,
    getDistance
}