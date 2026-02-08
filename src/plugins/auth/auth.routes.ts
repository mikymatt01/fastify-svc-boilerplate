import { type FastifyPluginCallback } from 'fastify'
import authController from './auth.controller'
import { RegisterBodySchema } from './auth.validation'
import { authToken } from '../../hooks/authentication'
import { generateSchemaValidation } from '../response.validation'

const tag = 'Auth'
const authRoutes: FastifyPluginCallback = (fastify, _opts, done) => {
    fastify.post(
        '/register',
        {
            preHandler: [authToken],
            schema: {
                tags: [tag],
                body: generateSchemaValidation(RegisterBodySchema),
                summary: 'Register a new user'
            }
        },
        authController.register
    )
    done()
}

export default authRoutes
