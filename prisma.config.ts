import 'dotenv/config'
import { defineConfig } from 'prisma/config'

const env = (key: string): string => {
    const value = process.env[key]
    if (value == null || value === '') {
        throw new Error(`Missing required environment variable: ${key}`)
    }
    return value
}

export default defineConfig({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations'
    },
    datasource: {
        url: env('DATABASE_URL')
    }
})
