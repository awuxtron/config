import type { AnyZodObject, TypeOf } from 'zod'
import { Config } from './config'
import type { DefineConfigOptions } from './types'
import { argv, env, json } from './resolvers'

export * from './config'
export * from './resolvers'
export * from './types'

export function defineConfig<S extends AnyZodObject>(schema: S, options: DefineConfigOptions = {}): TypeOf<S> {
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

    if (options.object) {
        config.addResolver(() => options.object ?? {})
    }

    return config.parse()
}
