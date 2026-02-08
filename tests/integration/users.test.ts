import { FastifyInstance } from 'fastify'
import getServer from '../../src/server'

describe('Users integration', () => {
    let fastify: FastifyInstance

    beforeAll(async () => {
        fastify = await getServer()
        await fastify.ready()
    })

    afterAll(async () => {
        await fastify.close()
    })

    describe('GET `/1/users/:userId`', () => {
        const baseUrl = '/1/users'

        it('should validate userId path parameter', async () => {
            const response = await fastify.inject({
                method: 'GET',
                url: `${baseUrl}/`
            })

            expect(response.statusCode).toBeGreaterThanOrEqual(400)
        })

        it('should return an error for a non existing user', async () => {
            const response = await fastify.inject({
                method: 'GET',
                url: `${baseUrl}/non-existing-user-id`
            })

            expect(response.statusCode).toBeGreaterThanOrEqual(400)
        })
    })
})
