import fastify from './index.js';

await fastify.listen({
  host: '0.0.0.0',
  port: '8080',
});

process.on('SIGINT', () => fastify.close());
process.on('SIGTERM', () => fastify.close());
