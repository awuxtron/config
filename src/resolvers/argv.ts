import type { Resolver } from '../types'
import type { Options } from 'yargs-parser'
import parser from 'yargs-parser'

export interface ArgvOptions extends Options {}

export const argv = (options: ArgvOptions = {}): Resolver => {
    return () => parser(process.argv.slice(2), options)
}
