# Organizador de Archivos CLI
Documentación continua de el desarrollo del programa.


## Configuración del entorno
- Versión de *Node.js*: v24.12.0
- Prettier + Eslint para desarrollo

## Módulos a utilizar
- path: Para construir rutas que funcionen en cualquier sistema operativo, evitando errores de barras diagonales.
- fs: Para leer el contenido de la carpeta, crear nuevos directorios y mover los archivos.
- os: Para obtener información del sistema, como la ruta del usuario actual o el separador de archivos.
- process: Para capturar los argumentos que el usuario pase por la terminal.

## Idea general
Crear un script que analice una carpeta específica, identifique la extensión de cada archivo y los mueva automáticamente a subcarpetas organizadas (por ejemplo: .jpg a una carpeta de "Imágenes", .pdf a "Documentos", etc.).