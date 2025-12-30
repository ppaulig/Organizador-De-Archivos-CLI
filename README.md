# Organizador de Archivos CLI - Testing 🧪

Este proyecto utiliza el test runner nativo de Node.js para garantizar que la lógica de organización de archivos sea robusta y segura.   

## ⤿ Estructura
Dentro de la carpeta tests se encuentra todo lo necesario para construcción de los mismos.

`organizador.test.js:` Contiene pruebas unitarias de cada función del programa.  

`/utils/crearCarpetas.js:` Contiene funciones reutilizables de apoyo para los tests.

## ⤿ Características
**⚬ Sin dependencias externas:** Se utilizan únicamente los módulos `node:test` y `node:assert`.  

**⚬ Entorno seguro:** Para evitar modificar archivos reales durante las pruebas, los tests crean automáticamente una carpeta temporal `./tests/carpeta-temporal` que se limpia después de cada ejecución.  

**⚬ Mocks de consola:** Se utilizan técnicas de mocking para verificar que la información mostrada al usuario sea la correcta.

## ⤿ Tests
**⚬ Revisar carpeta:** Valida que la app identifique correctamente solo los archivos, ignorando carpetas preexistentes.  

**⚬ Clasificar archivo:** Verifica que la lógica de extensiones asigne la categoría correcta (.pdf ➔ Documentos).  

**⚬ Crea carpetas y mueve archivos:** Asegura que las carpetas se creen y los archivos se desplacen dentro de ellas.  

**⚬ Visualizar archivos clasificados:** Comprueba que el resumen final por consola muestre la estructura esperada.

## ⤿ Ejecución
Desde la raíz del proyecto, se pueden usar los siguientes comandos:
```bash
# Ejecutar todos los tests una vez
npm test 

# Ejecutar en modo Watch, los tests se vuelven a ejecutar automáticamente al guardar
npm run test:watch
```
