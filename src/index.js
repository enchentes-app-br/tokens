import Fastify from 'fastify';

import FastifyPluginSwagger from '@fastify/swagger';
import FastifyPluginSwaggerUI from '@fastify/swagger-ui';
import FastifyPluginCORS from '@fastify/cors';
import FastifyPluginJWT from '@fastify/jwt';

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

await fastify.register(FastifyPluginJWT, {
  secret: process.env.JWT_SECRET,
});

fastify.get('/', {
  schema: {
    summary: 'Retrieve Service Information',
    tags: ['tokens'],
    response: {
      200: {
        type: 'object',
        required: ['name', 'version', 'description'],
        additionalProperties: false,
        properties: {
          name: { type: 'string' },
          version: { type: 'string' },
          description: { type: 'string' },
        },
      },
    },
  },
  handler: async function(request, reply) {
    reply.status(200)
      .send({
        name: pkg.name,
        version: pkg.version,
        description: pkg.description,
      });
  },
});

// -------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------

export default fastify;
