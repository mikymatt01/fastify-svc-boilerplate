import { type FastifyPluginCallback } from 'fastify'
import usersController from './users.controller'
import { generateSchemaValidation } from '../response.validation'
import { GetUserParamsSchema } from './users.validation'

const tag = 'User'

const userRoutes: FastifyPluginCallback = (fastify, _opts, done) => {
    fastify.get(
        '/:userId',
        {
            schema: {
                tags: [tag],
                params: generateSchemaValidation(GetUserParamsSchema),
                summary: 'Get user by ID'
            },
            preParsing: []
        },
        usersController.getUser
    )
    done()
}

export default userRoutes
