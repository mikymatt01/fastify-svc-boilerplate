import { type FastifyPluginCallback } from 'fastify'
import usersController from './users.controller'
import { generateSchemaValidation } from '../response.validation'
import { GetUserParamsSchema } from './users.validation'

const userRoutes: FastifyPluginCallback = (fastify, _opts, done) => {
    fastify.get(
        '/:userId',
        { schema: { params: generateSchemaValidation(GetUserParamsSchema) }, preParsing: [] },
        usersController.getUser
    )
    done()
}

export default userRoutes
