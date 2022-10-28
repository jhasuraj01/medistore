import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import path from "path";
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { schema } from './graphql/index.js';

import * as dotenv from 'dotenv';
import { ApolloServerPluginLandingPageProductionDefault, ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
dotenv.config()

const devenv = process.env.NODE_ENV === 'development'

export interface MyContext {
  token?: String;
}

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<MyContext>({
  schema,
  plugins: [
    devenv
      ? ApolloServerPluginLandingPageLocalDefault()
      : ApolloServerPluginLandingPageProductionDefault({
        embed: true,
        graphRef: "MedistoreGraph@current"
      }),
    ApolloServerPluginDrainHttpServer({ httpServer }),
  ],
  introspection: true,
});

await server.start();
app.use(express.static(path.resolve('../', 'landing/build')));
app.use(express.static(path.resolve('../', 'client/build')));

app.get("/", (req, res) => {
  res.sendFile(path.resolve('../', 'landing/build', 'index.html'));
});

app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);

app.get("*", (req, res) => {
  res.sendFile(path.resolve('../', 'client/build', 'index.html'));
});

// Modified server startup
const port:Number = Number(process.env.PORT) || 4000;
await new Promise<void>((resolve) => httpServer.listen({ port: port }, resolve));
console.log(`🚀 Server ready at http://localhost:${port}/`);