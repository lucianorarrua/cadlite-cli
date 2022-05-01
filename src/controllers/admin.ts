import inquirer from 'inquirer'
import { AdminTemplateParams, TemplateChoice } from '../types'
import crypto from 'crypto'
import { Controller } from './base'
import { convertCamelCaseToKebabCase, convertCamelCaseToSnakeCase } from '../utils'
import { lowerCamelCaseValidator } from '../validators'
import { ReduxSaga } from './redux-saga'

export class Admin extends Controller<AdminTemplateParams> {
  questions: inquirer.QuestionCollection<any>
  templateName: TemplateChoice

  constructor () {
    super()
    this.questions = [
      {
        name: 'admin-catalogue-name',
        type: 'input',
        message: 'Nombre del catálogo de administrador (utilizando lowerCamelCase):',
        validate: lowerCamelCaseValidator
      },
      {
        name: 'redux-saga-name',
        type: 'input',
        message: 'Nombre del reducer (utilizando lowerCamelCase):',
        validate: lowerCamelCaseValidator
      },
      {
        name: 'add-reducer',
        type: 'confirm',
        message: '¿Desea crear un nuevo reducer para el catálogo? (carpeta redux-saga dentro del catálogo). En el caso que el reducer ya exista, ingrese la opción "No" (n)'
      }
    ]
    this.templateName = 'admin'
  }

  processAnswers (this: Admin, answers: any): void {
    const adminNameChoice: string = answers['admin-catalogue-name']
    const addReducerChoice: boolean = answers['add-reducer']
    const reducerName: string = answers['redux-saga-name']
    const adminNameKebabCase = convertCamelCaseToKebabCase(adminNameChoice)
    const adminNameSnakeCase = convertCamelCaseToSnakeCase(adminNameChoice)
    const hash = crypto.createHash('md5').update(new Date().toString()).digest('hex').slice(0, 5)
    const currentDir = process.cwd()

    /* Agrega los archivos dentro del nuevo directorio con nombre `componentNameChoice` */
    this.createDirectoryContents(adminNameChoice, { adminNameKebabCase, adminNameSnakeCase, hash, reducerName })
    // Si se seleccionó la opción de crear el reducer, cambia al directorio raíz del catálogo y crea el reducer
    if (addReducerChoice) {
      process.chdir(`${currentDir}/${adminNameChoice}`)
      const reduxSagaController = new ReduxSaga()
      reduxSagaController.processAnswers({ 'redux-saga-name': reducerName })
    }
  }
}
