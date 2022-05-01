export type TemplateChoice = 'admin' | 'component' | 'redux-saga'

export interface ComponentTemplateParams {
  className: string
}
export interface ReduxSagaTemplateParams {
  entityName: string
  hash: string
}
