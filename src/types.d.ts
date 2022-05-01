export type TemplateChoice = 'admin' | 'component' | 'redux-saga'

export interface ComponentTemplateParams {
  className: string
}
export interface ReduxSagaTemplateParams {
  reducerName: string
  entityNameSnakeCase: string
  hash: string
}
export interface AdminTemplateParams {
  reducerName: string
  adminNameKebabCase: string
  adminNameSnakeCase: string
  hash: string
}
