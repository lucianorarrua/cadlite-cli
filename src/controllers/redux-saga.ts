import inquirer from 'inquirer'
import crypto from 'crypto'
import { ReduxSagaTemplateParams, TemplateChoice } from '../types'
import { Controller } from './base'
import { convertCamelCaseToSnakeCase } from '../utils'
import { lowerCamelCaseValidator } from '../validators'

export class ReduxSaga extends Controller<ReduxSagaTemplateParams> {
  questions: inquirer.QuestionCollection<any>
  templateName: TemplateChoice

  constructor () {
    super()
    this.questions = [
      {
        name: 'redux-saga-name',
        type: 'input',
        message: 'Nombre del reducer (utilizando lowerCamelCase):',
        validate: lowerCamelCaseValidator
      }]
    this.templateName = 'redux-saga'
  }

  processAnswers (this: ReduxSaga, answers: any): void {
    const reducerNameChoice: string = answers['redux-saga-name']
    const entityName = convertCamelCaseToSnakeCase(reducerNameChoice).toUpperCase()
    const hash = crypto.createHash('md5').update(reducerNameChoice).digest('hex').slice(0, 5)
    /* Agrega los archivos dentro del nuevo directorio con nombre `componentNameChoice` */
    this.createDirectoryContents('redux-saga', { entityName, hash })
  }
}
