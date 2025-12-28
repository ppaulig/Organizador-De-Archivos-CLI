# 📂 Organizador de Archivos CLI

Este proyecto es una herramienta de línea de comandos (CLI) desarrollada en **Node.js** diseñada para organizar archivos automáticamente.   
El script analiza una carpeta específica, identifica la extensión de cada archivo y los mueve a subcarpetas clasificadas (Imágenes, Documentos, Audio, Desarrollo y Varios.)

El objetivo principal de este repositorio es demostrar el dominio y la práctica de los **módulos nativos** de Node.js y el manejo de operaciones asíncronas.

## ⤿ Módulos Nativos Utilizados
* **fs/promises**: Utilizado para leer el contenido de directorios, crear carpetas y mover archivos de forma asíncrona.
* **path**: Crucial para construir rutas que funcionen en cualquier sistema operativo, evitando errores de compatibilidad con barras diagonales.
* **process**: Empleado para capturar los argumentos ingresados por el usuario en la terminal (`process.argv`).
* **util**: Implementado para mejorar la experiencia visual en la terminal mediante el formateo y coloreado de texto con `styleText`.
* **node:test**: Utilizado para la ejecución de pruebas automatizadas de forma nativa.
* **node:assert**: Empleado para realizar las validaciones y comparaciones en los entornos de prueba.

## ⤿ Ejempo de Funcionamiento
Imagina que tienes una carpeta llamada `Descargas` con archivos desordenados. Al ejecutar el programa, la estructura cambia de la siguiente manera:   

### ⚬ Estado inicial
`Descargas`/  
├── cancion.mp3  
├── script.js  
├── factura.pdf  
└── foto.jpg    

### ⚬ Comando
```bash
npm start -- "./Descargas"
```  
  
### ⚬ Estado final 
`Descargas`/  
├── **Audio**/  
│   └── cancion.mp3  
├── **Desarrollo**/  
│   └── script.js  
├── **Documentos**/  
│   └── factura.pdf  
└── **Imagenes**/  
    └── foto.jpg

## ⤿ Estructura del Código
`app.js`: Punto de entrada que gestiona el flujo principal y la captura de argumentos del sistema.  

`organizador.js`: Contiene la lógica de lectura, clasificación, movimiento y visualización de archivos.  

`utils.js`: Define las categorías y las extensiones de archivo soportadas.

## ⤿ Configuración y Comandos

### ⚬ Requisitos
- **Node.js**: v24.12.0 o superior.
- **Gestor de paquetes**: npm (incluido con Node.js).

### ⚬ Instalación
```bash
# Clonar el repositorio
git clone https://github.com/ppaulig/Organizador-De-Archivos-CLI.git

# Instalar dependencias de desarrollo (ESLint/Prettier)
npm install
```
  
### ⚬ Uso
Para organizar una carpeta, ejecuta el comando start seguido de la ruta (relativa o absoluta) tras el separador --:
```bash
npm start -- "./ruta/de/la/carpeta"
```    
    
## ⤿ Tests

Este proyecto cuenta con una estrategia de pruebas utilizando el **test runner nativo de Node.js**, para asegurar la integridad de la lógica de clasificación y el movimiento de archivos.

Dirigete a la rama **tests** de este repositorio para poder ejecutar las pruebas:
```bash
# Rama tests
git checkout tests
```
