import type { KeyTransformer, Resolver, Transformer } from '../types'
import type { DotenvConfigOptions } from 'dotenv'
import { config as loadEnvFile } from 'dotenv'
import { camelCase } from 'change-case'
import { map, unflatten } from '@awuxtron/utils'

export interface EnvOptions extends DotenvConfigOptions {
    keyTransformers?: KeyTransformer[]
    transformers?: Transformer[]
}

export const env = (options: EnvOptions = {}): Resolver => {
    const {
        keyTransformers = [(k) => k.replace(/__/g, '.'), (k) => camelCase(k, { stripRegexp: /[^A-Z0-9.]/gi })],
        transformers = [<Transformer>unflatten],
        ...dotenvConfig
    } = options

    return () => {
        loadEnvFile(dotenvConfig)

        const keyTransformed = map(process.env, (key: string, value) => [
            keyTransformers.reduce((key, transformer) => transformer(key), key),
            value,
        ])

        return transformers.reduce((config, transformer) => transformer(config), { ...process.env, ...keyTransformed })
    }
}
