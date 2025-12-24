# 📂 Organizador de Archivos CLI

Este proyecto es una herramienta de línea de comandos (CLI) desarrollada en **Node.js** diseñada para organizar archivos automáticamente. El script analiza una carpeta específica, identifica la extensión de cada archivo y los mueve a subcarpetas clasificadas (Imágenes, Documentos, Audio, Desarrollo y Varios.)

El objetivo principal de este repositorio es demostrar el dominio y la práctica de los **módulos nativos** de Node.js y el manejo de operaciones asíncronas.

## ʚଓ Módulos Nativos Utilizados
* **`fs/promises`**: Utilizado para leer el contenido de directorios, crear carpetas y mover archivos de forma asíncrona.
* **`path`**: Crucial para construir rutas que funcionen en cualquier sistema operativo, evitando errores de compatibilidad con barras diagonales.
* **`process`**: Empleado para capturar los argumentos ingresados por el usuario en la terminal (`process.argv`).
* **`util`**: Implementado para mejorar la experiencia visual en la terminal mediante el formateo y coloreado de texto con `styleText`.
* **`node:test`**: Utilizado para la ejecución de pruebas automatizadas de forma nativa.
* **`node:assert`**: Empleado para realizar las validaciones y comparaciones en los entornos de prueba.  

## ʚଓ Estructura del Código
* **`app.js`**: Punto de entrada que gestiona el flujo principal y la captura de argumentos del sistema.
* **`organizador.js`**: Contiene la lógica de lectura, clasificación, movimiento y visualización de archivos.
* **`utils.js`**: Define las categorías y las extensiones de archivo soportadas.

## ʚଓ Características Técnicas
* **Procesamiento Paralelo**: Implementación de `Promise.all` para ejecutar el movimiento de archivos de forma simultánea, optimizando el rendimiento.
* **Normalización de Rutas**: Uso de `path.resolve` para convertir rutas relativas ingresadas por el usuario en rutas absolutas seguras.
* **Recursividad en Directorios**: Uso de `mkdir` con la opción `{ recursive: true }` para asegurar la creación de carpetas sin errores si estas ya existen.
* **Manejo de Errores**: Sistema de propagación de errores (`throw new Error`) desde los módulos lógicos hasta el flujo principal en `app.js`.

## ʚଓ Configuración y Comandos

### Requisitos
- **Node.js**: v24.12.0 o superior.
- **Gestor de paquetes**: npm (incluido con Node.js).

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/ppaulig/Organizador-De-Archivos-CLI.git

# Instalar dependencias de desarrollo (ESLint/Prettier)
npm install
```
  
### Uso
Para organizar una carpeta, ejecuta el comando start seguido de la ruta (relativa o absoluta) tras el separador --:
```bash
npm start -- "./ruta/de/la/carpeta"
```  

## ʚଓ Tests
Este proyecto cuenta con una estrategia de pruebas para asegurar la integridad de la lógica y el funcionamiento del programa.

En la rama **`tests`** de este repositorio, podrás encontrar:
* **Tests Unitarios**: Pruebas aisladas para cada función.
* **Tests de Integración**: Pruebas que validan el flujo completo desde la lectura de la carpeta hasta el movimiento final de los archivos.

```bash
# Cambiarse a la rama test
git checkout test

# Ejecutar tests
npm test
```
