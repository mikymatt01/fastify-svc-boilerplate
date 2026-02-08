import { type FastifyPluginCallback } from 'fastify'
import authController from './auth.controller'
import { RegisterBodySchema } from './auth.validation'
import { authToken } from '../../hooks/authentication'
import { generateSchemaValidation } from '../response.validation'

const authRoutes: FastifyPluginCallback = (fastify, _opts, done) => {
    fastify.post(
        '/register',
        { preHandler: [authToken], schema: { body: generateSchemaValidation(RegisterBodySchema) } },
        authController.register
    )
    done()
}

export default authRoutes
