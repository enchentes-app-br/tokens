import Fastify from 'fastify';

import FastifyPluginSwagger from '@fastify/swagger';
import FastifyPluginSwaggerUI from '@fastify/swagger-ui';
import FastifyPluginCORS from '@fastify/cors';

import { promises as fs } from 'fs';

const fastify = Fastify({
  logger: true,
  ajv: {
    customOptions: {
      allErrors: true,
      coerceTypes: false,
      strict: false,
    },
  },
});

const pkg = JSON.parse(await fs.readFile('./package.json', 'utf8'));

await fastify.register(FastifyPluginSwagger, {
  openapi: {
    info: {
      title: pkg.name,
      version: pkg.version,
      description: pkg.description,
    },
    tags: [
      {
        name: 'tokens',
        description: 'Tokens Service',
      },
    ],
  },
});

await fastify.register(FastifyPluginSwaggerUI, {
  routePrefix: '/docs',
});

await fastify.register(FastifyPluginCORS, {
  origin: '*',
});

export default fastify;
