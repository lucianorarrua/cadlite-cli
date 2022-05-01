# Estructura del proyecto

⚠️⚒️Work in progress ⚠️⚒️

# ¿Como agregar un nuevo template?

1. Agregar el template en el directorio `templates/` y darle un nombre (p.ej: **myTemplate**)
2. Dirigirse al archivo `src/types.d.ts` y agregar en el type `TemplateChoice` un string con el nombre del nuevo template. Debe ser igual al nombre de la carpeta que que se agregó en `templates/`. 
    ```ts
    export type TemplateChoice = 'admin' | 'component' | ... | 'myTemplate'
    ```
    Además, si el template tiene parámetros remplazables, se debe crear una interface con dichos parámetros:
    ```ts
    export interface MyTemplateParams {
        param1: string,
        param2: string
    }
    ```
3. Crear un archivo **.ts** en el directorio `src/controllers/` con el mismo nombre que tiene el template (p.ej: **myTemplate.ts**). En el archivo creado, agregar una clase que extienda de la clase abstracta "`Controller`" que se encuentra en `src/controllers/base.ts` e implementar dicha clase. Se debe implementar las propiedades `questions` y `templateName` y además el método `processAnswers`. Opcionalmente se debe asignar una interface a la `Controller`, el cual es una clase genérica. En este caso, se le asigna la interface `MyTemplateParams` previamente creada.
   ```ts
    import inquirer from 'inquirer'
    import { TemplateChoice } from '../types'
    import { Controller } from './base'

    export class MyTemplate extends Controller<MyTemplateParams | any> {
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
            this.createDirectoryContents(
                componentNameChoice, 
                {
                   param1: 'value1',
                   param2:  'value2'
                }
            )
        }
    }
   ```
4. Agregar la nueva clase en el archivo `index.ts` que se encuentra en el directorio `src/controllers/`
5. Dirigirse al archivo `src/index.ts` y, en la propiedad `controllers`, agregar un nuevo campo con el nombre del nuevo template. El valor de dicho campo debe ser una instancia de la clase previamente creada en `src/controllers/`.
6. ¡Ejecutar el CLI y utilizar el nuevo template!

> Nota: para parametrizar un template se utiliza la dependencia `ejs`. Se recomienda leer documentación o revisar los otros templates para poder parametrizar uno nuevo. 

# Referencias 

- [Creating a project generator with Node](https://medium.com/northcoders/creating-a-project-generator-with-node-29e13b3cd309)
- [How to build your own project templates using Node CLI and typescript](https://medium.com/@pongsatt/how-to-build-your-own-project-templates-using-node-cli-c976d3109129)