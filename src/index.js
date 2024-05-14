import Fastify from 'fastify';

import FastifyPluginSwagger from '@fastify/swagger';
import FastifyPluginSwaggerUI from '@fastify/swagger-ui';
import FastifyPluginCORS from '@fastify/cors';
import FastifyPluginJWT from '@fastify/jwt';

import TokensSchemaJWT from './schemas/JWT.js';

import TokensRouteCreate from './routes/create.js';

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

await fastify.register(FastifyPluginSwagger, {
  openapi: {
    info: {
      title: process.env.npm_package_name,
      version: process.env.npm_package_version,
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
        required: ['name', 'version'],
        additionalProperties: false,
        properties: {
          name: { type: 'string' },
          version: { type: 'string' },
        },
      },
    },
  },
  handler: async function(request, reply) {
    reply.status(200)
      .send({
        name: process.env.npm_package_name,
        version: process.env.npm_package_version,
      });
  },
});

// -------------------------------------------------------------------------------------------------

fastify.addSchema(TokensSchemaJWT);

fastify.post('/v1/tokens', TokensRouteCreate);

// -------------------------------------------------------------------------------------------------

export default fastify;
