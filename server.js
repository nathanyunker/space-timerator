var express = require('express');
var express_graphql = require('express-graphql');
var solaire = require('./apis/solaire');
var metrics = require('./const/metrics');
var bodiesCacheDict = require('./bodies_cache_dict.json');
const schema = require('./schema');
const { snakecaseName } = require('./utils/format');
const _ = require('lodash');

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

function convertMeticValue(original, target, value) {

    //replace with conversion library, utilizing metics const
    if (original === target) return value;

    const conversionObject = metrics[original];
    const converstionFunction = `to${target.charAt(0).toUpperCase() + target.slice(1)}`;
    const result = value * conversionObject[converstionFunction];
    return result;
}

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

var root = {
    distance: getDistance,
    bodies: getBodies,
    body: getBody
};

var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
