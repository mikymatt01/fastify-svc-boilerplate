import { FastifyInstance } from 'fastify'
import getServer from '../../src/server'

describe('Auth integration', () => {
    let fastify: FastifyInstance

    beforeAll(async () => {
        fastify = await getServer()
        await fastify.ready()
    })

    afterAll(async () => {
        await fastify.close()
    })

    describe('POST `/1/auth/register`', () => {
        const baseUrl = '/1/auth/register'

        it('should validate required fields', async () => {
            const response = await fastify.inject({
                method: 'POST',
                url: baseUrl,
                payload: {}
            })

            expect(response.statusCode).toBeGreaterThanOrEqual(400)
        })

        it('should reject weak passwords (shorter than 6 chars)', async () => {
            const response = await fastify.inject({
                method: 'POST',
                url: baseUrl,
                payload: {
                    email: 'user@example.com',
                    password: '123',
                    name: 'John',
                    surname: 'Doe'
                }
            })

            expect(response.statusCode).toBeGreaterThanOrEqual(400)
        })
    })
})
