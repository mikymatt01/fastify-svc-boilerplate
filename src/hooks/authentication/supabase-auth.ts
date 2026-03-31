import config from '../../config/server.config'
import { jwtVerify, createRemoteJWKSet } from 'jose'

const PROJECT_JWKS = createRemoteJWKSet(new URL(`${config.supabase.supabaseUrl}/auth/v1/.well-known/jwks.json`))

const verifySupabaseToken = async (token: string): Promise<TokenDecoded> => {
    const data = await jwtVerify(token, PROJECT_JWKS)
    const { user_metadata: userMetadata, error } = data.payload as {
        user_metadata: { sub: string; email: string }
        error: Error | null
    }

    if (error || !userMetadata) {
        throw new Error(`Invalid token: ${error?.message || 'User not found'}`)
    }

    return {
        id: userMetadata.sub,
        email: userMetadata.email
    }
}

export default verifySupabaseToken
