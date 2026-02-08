/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FastifyInstance } from 'fastify'
import getServer from '../../src/server'
import config from '../../src/config/server.config'

describe('Integration tests examples', () => {
    let fastify: FastifyInstance

    beforeAll(async () => {
        fastify = await getServer()
        await fastify.ready()
    })

    afterAll(async () => {
        await fastify.close()
    })

    describe('GET `/1/health` route', () => {
        it('should return 200 and a JSON health payload', async () => {
            const response = await fastify.inject({
                method: 'GET',
                url: '/1/health'
            })

            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toMatch(/application\/json/)

            const bodyUnknown: unknown = response.json()
            const body = bodyUnknown as {
                data: { uptime: number; pid: number; platform: string }
                status: string
                code: string
            }

            expect(body).toEqual(
                expect.objectContaining({
                    data: expect.objectContaining({
                        uptime: expect.any(Number),
                        pid: expect.any(Number),
                        platform: expect.any(String)
                    }),
                    status: 'GENERIC_SUCCESS',
                    code: 'SUCCESS'
                })
            )
        })
    })

    describe('GET `/docs/openapi.json` route', () => {
        it('should return 200 and the OpenAPI JSON', async () => {
            const response = await fastify.inject({
                method: 'GET',
                url: '/docs/openapi.json',
                headers: {
                    'x-api-key': config.adminApiKey
                }
            })

            expect(response.statusCode).toBe(200)
            expect(response.headers['content-type']).toMatch(/application\/json/)

            const bodyUnknown: unknown = response.json()
            const body = bodyUnknown as { openapi: string; paths: Record<string, unknown> }
            expect(body).toHaveProperty('openapi')
            expect(body).toHaveProperty('paths')
        })
    })

    describe('POST `/1/auth/register` route', () => {
        it('should fail with 400 when body is missing required fields', async () => {
            const response = await fastify.inject({
                method: 'POST',
                url: '/1/auth/register',
                payload: {
                    email: 'user@example.com'
                }
            })

            expect(response.statusCode).toBeGreaterThanOrEqual(400)
        })
    })

    describe('GET `/1/users/:userId` route', () => {
        it('should return 400 or 404 for non existing user', async () => {
            const response = await fastify.inject({
                method: 'GET',
                url: '/1/users/non-existing-user-id'
            })

            expect(response.statusCode).toBeGreaterThanOrEqual(400)
        })
    })
})
