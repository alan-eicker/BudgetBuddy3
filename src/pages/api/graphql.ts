import type { NextApiRequest, NextApiResponse } from 'next';
import { createSchema, createYoga } from 'graphql-yoga';
import mongoose, { ConnectOptions } from 'mongoose';
import fs from 'fs';
import path from 'path';
import Query from '../../graphql/resolvers/queries';
import Mutation from '../../graphql/resolvers/mutations';

export const config = {
  api: {
    bodyParser: false,
  },
};

const connOptions: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGODB_URI as string, connOptions);

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
