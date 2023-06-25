import type { AnyZodObject, TypeOf } from 'zod'
import type { Resolver } from './types'

export class Config<S extends AnyZodObject = AnyZodObject> {
    public resolvers: Set<Resolver> = new Set()

    public constructor(public readonly schema: S) {}

    public addResolver(resolver: Resolver): this {
        this.resolvers.add(resolver)

        return this
    }

    public resolve(): Record<string, any> {
        const config = {}

        for (const resolver of this.resolvers) {
            Object.assign(config, resolver(this.schema))
        }

        return config
    }

    public parse(): TypeOf<S> {
        return this.schema.parse(this.resolve())
    }
}
