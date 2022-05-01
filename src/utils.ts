export const convertCamelCaseToKebabCase = (string: string): string => string.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)

export const convertCamelCaseToSnakeCase = (string: string): string => string.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
