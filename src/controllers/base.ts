import inquirer, { QuestionCollection } from 'inquirer'
import fs from 'fs'
import ejs from 'ejs'
import { TemplateChoice } from '../types'

export abstract class Controller<TemplateParams = any> {
  abstract questions: QuestionCollection<any>
  abstract templateName: TemplateChoice

  abstract processAnswers (this: Controller<TemplateParams>, answers: any): void

  getTemplatePath = (): string => `${__dirname}/../../templates/${this.templateName}`

  /**
   * Función que se llama al seleccionar este template.
   * Es necesario que la clase implemente el método `processAnswer` el cual recibe las respuestas de las `questions`.
   */
  runQuestions (): void {
    inquirer
      .prompt(this.questions)
      .then((answers) => this.processAnswers(answers))
      .catch((e) => {
        console.log(`❌ Ocurrió un error al procesar el template ${this.templateName}`, e)
      })
  }

  /**
   * Copia todos los archivos de un `template` en un nuevo directorio. Opcionalmente remplaza los valores de `templateParams` en el template.
   * Es una función recursiva que va recorriendo las carpetas "hijo" y tamibién va copiando su contenido.
   * @param newDirname - Nombre del nuevo directorio donde donde se va a copiar el template.
   * @param templateParams - Objeto con los valores a reemplazar en el `template`.
   * @param templatePath - Ruta donde se encuentra el `template` a copiar.
   */
  createDirectoryContents (newDirname: string, templateParams?: TemplateParams, templatePath = `${__dirname}/../../templates/${this.templateName}`): void {
    const currentDir = process.cwd()
    if (fs.existsSync(`${currentDir}/${newDirname}`)) {
      throw new Error(`Ya existe una carpeta con el nombre ${newDirname} en el directorio actual`)
    }
    /* Crea un directorio con el nombre `componentNameChoice` en la ruta actual */
    fs.mkdirSync(`${currentDir}/${newDirname}`)
    /* Lee los archivos/carpetas del en el templatePath */
    const itemsToCreate = fs.readdirSync(templatePath)
    /* Recorre los archivos/carpetas (items) en el templatePath y los va copiando en la ruta destino */
    itemsToCreate.forEach((itemName) => {
      // Ruta del archivo/carpeta a copiar
      const origFilePath = `${templatePath}/${itemName}`
      // Obtiene metadatos del archivo/carpeta
      const stats = fs.statSync(origFilePath)
      // Si el item es un archivo, lo pega en el directorio newProjectPath
      if (stats.isFile()) {
        let contents = fs.readFileSync(origFilePath, 'utf8')
        // Si hay templateParams, se utiliza la librería `ejs` para remplazar dichos valores en el template.
        if (templateParams !== null) {
          contents = ejs.render(contents, templateParams)
        }
        const writePath = `${currentDir}/${newDirname}/${itemName}`
        fs.writeFileSync(writePath, contents, 'utf8')
        return
      }
      // Si el item es una carpeta, baja un nivel (se mete en la carpeta) y vuelve a llamar a la función desde ahí
      if (stats.isDirectory()) {
        this.createDirectoryContents(`${newDirname}/${itemName}`, templateParams, `${templatePath}/${itemName}`)
      }
    })
  }
}
