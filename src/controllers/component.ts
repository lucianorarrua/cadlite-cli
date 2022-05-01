import inquirer from 'inquirer'
import { ComponentTemplateParams, TemplateChoice } from '../types'
import { Controller } from './base'
import { convertCamelCaseToKebabCase } from '../utils'
import { lowerCamelCaseValidator } from '../validators'

export class Component extends Controller<ComponentTemplateParams> {
  questions: inquirer.QuestionCollection<any>
  templateName: TemplateChoice

  constructor () {
    super()
    this.questions = [
      {
        name: 'component-name',
        type: 'input',
        message: 'Nombre del componente (utilizando lowerCamelCase):',
        validate: lowerCamelCaseValidator
      }]
    this.templateName = 'component'
  }

  processAnswers (this: Component, answers: any): void {
    const componentNameChoice: string = answers['component-name']
    const className = convertCamelCaseToKebabCase(componentNameChoice)
    /* Agrega los archivos dentro del nuevo directorio con nombre `componentNameChoice` */
    this.createDirectoryContents(componentNameChoice, { className })
  }
}
