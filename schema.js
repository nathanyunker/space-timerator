const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query {
        distance(target: String!, location: String!, metric: String!): Distance
        bodies(name: String!): [Body]
        body(target: String!): Body
    },
    type Distance {
        value: Float
        metric: String
    }
    type Body {
        id: String
        name: String
        englishName: String
        isPlanet: Boolean
        moons: [Moon]
        mass: Mass
        volume: Volume
        gravity: Float
        density: Float
    }
    type Moon {
        name: String
        id: String
        perihelion: Float
        aphelion:Float
        gravity: Float
        escape: Float
        mass: Mass
        volume: Volume
    }
    type Mass {
        massValue: Float
        massExponent: Float
    }
    type Volume {
        volValue: Float
        volExponent: Float
    }
`);

module.exports = schema;