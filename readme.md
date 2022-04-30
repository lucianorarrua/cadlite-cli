# Estructura del proyecto

⚠️⚒️Work in progress ⚠️⚒️

# ¿Como agregar un nuevo template?

1. Agregar el template en el directorio `src/templates` y darle un nombre (p.ej: **myTemplate**)
2. Dirigirse al archivo `src/types.d.ts` y agregar en el type `TemplateChoice` un string con el nombre del nuevo template. Debe ser igual al nombre de la carpeta que que se agregó en `src/templates`. 
    ```ts
    export type TemplateChoice = 'admin' | 'component' | ... | 'myTemplate'
    ```
3. Crear un archivo **.ts** en el directorio `src/controllers` con el mismo nombre que tiene el template (p.ej: **myTemplate.ts**). En el archivo creado, agregar una clase que extienda de la clase abstracta "`Controller`" que se encuentra en `src/controllers/base.ts` e implementar dicha clase. Se debe implementar las propiedades `questions` y `templateName` y además el método `processAnswers`:
   ```ts
    import inquirer from 'inquirer'
    import { TemplateChoice } from '../types'
    import { Controller } from './base'

    export class MyTemplate extends Controller {
        questions: inquirer.QuestionCollection<any>
        templateName: TemplateChoice

        constructor () {
            super()
            this.questions = [
                {
                    name: 'question-name',
                    type: 'input',
                    message: 'Esto es una mensaje de prueba',
                }
            ]
            this.templateName = 'myTemplate'
        }

        processAnswers (answers: any): void {
            const inputValueForUser: string = answers['question-name']
            ...
        }
    }
   ```
4. Dirigirse al archivo `src/index.ts` y, en la propiedad `controllers`, agregar un nuevo campo con el nombre del nuevo template. El valor de dicho campo debe ser una instancia de la clase previamente creada en `src/controllers`.
5. ¡Ejecutar el CLI y utilizar el nuevo template!

# Referencias 

- [Creating a project generator with Node](https://medium.com/northcoders/creating-a-project-generator-with-node-29e13b3cd309)
- [How to build your own project templates using Node CLI and typescript](https://medium.com/@pongsatt/how-to-build-your-own-project-templates-using-node-cli-c976d3109129)