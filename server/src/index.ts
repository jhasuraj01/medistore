import { ApolloServerPluginLandingPageProductionDefault, ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import path from "path";
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { schema } from './graphql/index.js';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { DecodedIdToken, getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore';

import * as dotenv from 'dotenv';
dotenv.config()

const devenv = process.env.NODE_ENV === 'development'

initializeApp({ credential: applicationDefault() })
const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true })

export interface MyContext {
  user: DecodedIdToken | null
  db: FirebaseFirestore.Firestore
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
  cors<cors.CorsRequest>({
    credentials: true
  }),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      try {
        const token = req.headers.authorization?.split(' ')[1] || ''
        const decodedToken = await getAuth().verifyIdToken(token);
        return {
          user: decodedToken,
          db,
        }
      } catch (error) {
        return {
          user: null,
          db,
        }
      }
    },
  }),
);

app.get("*", (req, res) => {
  res.sendFile(path.resolve('../', 'client/build', 'index.html'));
});

// Modified server startup
const port: Number = Number(process.env.PORT) || 4000;
await new Promise<void>((resolve) => httpServer.listen({ port: port }, resolve));
console.log(`🚀 Server ready at http://localhost:${port}/`);