import type { AnyZodObject } from 'zod'
import type { ArgvOptions, EnvOptions, JsonOptions } from './resolvers'

export type Resolver = (schema: AnyZodObject) => Record<string, any>

export type KeyTransformer = (key: string) => string

export type Transformer = (config: Record<string, any>) => Record<string, any>

export interface DefineConfigOptions {
    argv?: ArgvOptions | boolean
    env?: EnvOptions | boolean
    json?: JsonOptions | false
}
