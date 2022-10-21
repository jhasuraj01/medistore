import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import path from "path";
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import metadata from './metadata.js';

import * as dotenv from 'dotenv';
dotenv.config()

const typeDefs = `#graphql
  type MetaData {
    version: String!
    buildAt: String!
    platform: String!
  }
  type Query {
    metadata: MetaData!
  }
`;

const resolvers = {
  Query: {
    metadata: () => metadata,
  },
};

interface MyContext {
  token?: String;
}

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();
app.use(express.static(path.resolve('../', 'client/build')));

app.get("*", (req, res, next) => {
  if(req.path == '/graphql') next();
  else res.sendFile(path.resolve('../', 'client/build', 'index.html'));
});

app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);

// Modified server startup
const port:Number = Number(process.env.PORT) || 4000;
await new Promise<void>((resolve) => httpServer.listen({ port: port }, resolve));
console.log(`🚀 Server ready at http://localhost:${port}/`);