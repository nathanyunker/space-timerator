const express = require('express');
const express_graphql = require('express-graphql');
const schema = require('./schema');
const { getDistance } = require('./lib/utils');
const { getBody, getBodies } = require('./models/Body');

const root = {
    distance: getDistance,
    bodies: getBodies,
    body: getBody
};

const app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
