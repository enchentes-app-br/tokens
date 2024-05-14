import fastify from './fastify.js';

// -------------------------------------------------------------------------------------------------

import TokensSchemaJWT from './schemas/JWT.js';

import TokensRouteCreate from './routes/create.js';

fastify.addSchema(TokensSchemaJWT);

fastify.post('/v1/tokens', TokensRouteCreate);

// -------------------------------------------------------------------------------------------------

export default fastify;
