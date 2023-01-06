import { integerSchema } from "../types/integer"

/**
 * Converts string into integer
 * @param string String to convert into integer
 * @returns Integer or `undefined` if cannot be converted
 */
export function stringToInt(string: string): number | undefined {
    try {
        return integerSchema.cast(string)
    }
    catch (error) {
        return undefined
    }
}

/**
 * Converts parameters into integer
 * @param param String to convert into integer
 * @returns Integer or `undefined` if cannot be converted
 */
export function paramToInt(param: string | string[] | undefined): number | undefined {
    if (typeof param !== 'string') return undefined
    else return stringToInt(param)
}