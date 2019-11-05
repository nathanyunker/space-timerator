const request = require('superagent');

const getBodies = () => {
    return request
        .get('https://api.le-systeme-solaire.net/rest/bodies/')
        .set('Accept', 'application/json')
}

module.exports = {
    getBodies
}