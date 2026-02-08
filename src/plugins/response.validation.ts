import { z } from 'zod'

export const ResponseSchema = z.object({
    status: z.string().min(1),
    code: z.string().min(1)
})
export type Response = z.infer<typeof ResponseSchema>
export const generateSchemaValidation = (schema: z.ZodTypeAny) =>
    z.toJSONSchema(schema, {
        target: 'draft-07',
        io: 'input'
    })
