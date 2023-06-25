import type { AnyZodObject, infer as ZodInfer } from 'zod'
import { Config } from './config'
import type { DefineConfigOptions } from './types'
import { argv, env, json } from './resolvers'

export * from './config'
export * from './resolvers'
export * from './types'

export function defineConfig<S extends AnyZodObject>(schema: S, options: DefineConfigOptions = {}): ZodInfer<S> {
    const config = new Config(schema)

    if (options.argv !== false) {
        config.addResolver(argv(options.argv !== true ? options.argv : undefined))
    }

    if (options.env !== false) {
        config.addResolver(env(options.env !== true ? options.env : undefined))
    }

    if (options.json) {
        config.addResolver(json(options.json))
    }

    return config.parse()
}
