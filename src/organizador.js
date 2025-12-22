// Lógica para clasificar y mover archivos
import fs from 'node:fs/promises'

// Abrir la carpeta y ver los archivos dentro
export async function revisarCarpeta(ruta) { // debemos pasar la ruta completa no solo el nombre de la carpeta
    try {
        const contenidoCarpeta = await fs.readdir(ruta, { withFileTypes: true }) // obtenemos un arreglo con todos los archivos/carpetas, 
        // fileTypes permite saber si son archivos o carpetas
        const archivos = contenidoCarpeta.filter(elemento => elemento.isFile()).map(archivo => archivo.name)
        // obtenemos SOLO los archivos excluyendo carpetas, y luego los transformamos solo con su nombre (les quitamos las propiedades de withFileTypes)
        return archivos
    } catch (error) {
        return console.error('Error al abrir la carpeta:' + error)
    }
}
