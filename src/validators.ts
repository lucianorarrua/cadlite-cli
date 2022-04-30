export const lowerCamelCaseValidator = (input: any): boolean | string => /^([a-z]+[A-Z0-9][a-z0-9]+[A-Za-z0-9]*)+$/.test(input) ? true : 'El nombre del componente debe estar escrito en lowerCamelCase'

export const upperCamelCaseValidator = (input: any): boolean | string => /^([A-Z][a-z0-9]*[A-Z0-9][a-z0-9]+[A-Za-z0-9]*)+$/.test(input) ? true : 'El nombre del componente debe estar escrito en UpperCamelCase'

// eslint-disable-next-line no-useless-escape
export const snakeCaseValidator = (input: any): boolean | string => /^([A-Za-z\-\_\d])+$/.test(input) ? true : 'El nombre del componente debe estar escrito en snake_case'
