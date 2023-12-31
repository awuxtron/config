import type { Resolver } from '../types'
import JSON5 from 'json5'
import { existsSync, readFileSync } from 'node:fs'
import { assert } from '@awuxtron/utils'

export interface JsonOptions {
    path: string
    required?: boolean
    reviver?: Parameters<typeof JSON5.parse>[1]
}

export const json = (options: JsonOptions): Resolver => {
    const { path, required = false, reviver } = options

    return () => {
        const isExists = existsSync(path)

        if (!required && !isExists) {
            return {}
        }

        assert(isExists, `The config file ${path} does not exist`)

        const content = readFileSync(path, { encoding: 'utf8' })

        try {
            return JSON5.parse(content, reviver)
        } catch {
            throw new Error(`The config file ${path} is not a valid JSON/JSON5 file`)
        }
    }
}
