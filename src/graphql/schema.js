const jenisKelaminSchema = require("./jenis_kelamin/schema");
const programStudiSchema = require("./program_studi/schema");

const typeDefs = `#graphql
    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }
`;

module.exports = [
    typeDefs,
    jenisKelaminSchema,
    programStudiSchema
];