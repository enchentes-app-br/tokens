import Fastify from 'fastify';

import FastifyPluginSwagger from '@fastify/swagger';
import FastifyPluginSwaggerUI from '@fastify/swagger-ui';
import FastifyPluginCORS from '@fastify/cors';
import FastifyPluginJWT from '@fastify/jwt';

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

export default fastify;
