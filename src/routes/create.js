import { v4 } from 'uuid';

export default {
  schema: {
    summary: 'Create a Token',
    tags: ['tokens'],
    response: {
      201: {
        content: {
          'application/jwt': {
            schema: { type: 'string' },
          },
        },
      },
    },
  },
  handler: async function(request, reply) {
    const token = this.jwt.sign({ user: { _id: v4() } });

    reply
      .status(201)
      .type('application/jwt')
      .send(token);
  },
};
