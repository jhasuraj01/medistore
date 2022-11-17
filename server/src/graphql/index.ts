import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { mergeResolvers } from "@graphql-tools/merge";
import { loadFiles } from "@graphql-tools/load-files";

const __dirname = dirname(fileURLToPath(import.meta.url));

const resolverFiles = await loadFiles(join(__dirname, "./**/*.resolver.*"), { useRequire: false })

const typeDefs = loadSchemaSync("./**/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: mergeResolvers(resolverFiles),
});