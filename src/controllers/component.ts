import inquirer from 'inquirer'
import { TemplateChoice } from '../types'
import { Controller } from './base'
import { lowerCamelCaseValidator } from '../validators'

export class Component extends Controller {
  questions: inquirer.QuestionCollection<any>
  templateName: TemplateChoice

  constructor () {
    super()
    this.questions = [
      {
        name: 'component-name',
        type: 'input',
        message: 'Nombre del componente (utilizando camelCase):',
        validate: lowerCamelCaseValidator
      }]
    this.templateName = 'component'
  }

  processAnswers (this: Component, answers: any): void {
    const componentNameChoice: string = answers['component-name']
    const templatePath = this.getTemplatePath()
    /* Agrega los archivos dentro del nuevo directorio con nombre `componentNameChoice` */
    this.createDirectoryContents(componentNameChoice)
    this.replaceValues(templatePath)
  }

  replaceValues (newContentPath: string): void {
    console.log('🚀 ~ TODO', newContentPath)
  }
}
