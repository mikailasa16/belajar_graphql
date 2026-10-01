const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");

// GraphQL Schema
const typeDefs = require("../graphql/schema");

// GraphQL Resolvers
const jenisKelaminResolvers = require("../graphql/jenis_kelamin/resolvers");
const programStudiResolvers = require("../graphql/program_studi/resolvers");

const app = express();

app.use(cors());
app.use(express.json());

console.log("Port dari env:", process.env.PORT);

app.get("/", (req, res) => {
    res.json({
        message: "API Mahasiswa berjalan dan sukses",
        port: process.env.PORT
    });
});

const resolvers = {
    Query: {
        ...jenisKelaminResolvers.Query,
        ...programStudiResolvers.Query
    },

    Mutation: {
        ...jenisKelaminResolvers.Mutation,
        ...programStudiResolvers.Mutation
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

async function startGraphQL() {
    await server.start();

    app.use(
        "/graphql",
        expressMiddleware(server)
    );
}

startGraphQL();

module.exports = app;