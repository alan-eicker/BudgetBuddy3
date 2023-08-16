import type { NextApiRequest, NextApiResponse } from 'next';
import { createSchema, createYoga } from 'graphql-yoga';
import fs from 'fs';
import path from 'path';
import Query from '../../graphql/resolvers/queries';
import Mutation from '../../graphql/resolvers/mutations';

export const config = {
  api: {
    bodyParser: false,
  },
};

const typeDefs = fs
  .readFileSync(
    path.join(process.cwd(), '/src/graphql/schema/typedefs.graphql'),
  )
  .toString('utf-8');

const resolvers = {
  Query,
  Mutation,
};

const schema = createSchema<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  typeDefs,
  resolvers,
});

export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema,
  graphqlEndpoint: '/api/graphql',
});
