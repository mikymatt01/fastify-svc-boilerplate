import { PrismaClient } from '@prisma/client'
import config from '../config/server.config'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

let prisma: PrismaClient | undefined

function getPrisma(): PrismaClient {
    if (config.env === 'production') {
        prisma ??= new PrismaClient()
        return prisma
    }

    if (globalForPrisma.prisma == null) {
        globalForPrisma.prisma = new PrismaClient()
    }

    return globalForPrisma.prisma
}

const db = new Proxy(
    {},
    {
        get(_target, prop) {
            return (getPrisma() as never)[prop as never]
        }
    }
) as PrismaClient

export default db
