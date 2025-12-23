// Lógica para clasificar y mover archivos
import fs from 'node:fs/promises'
import path from 'node:path'

// Abrir la carpeta y ver los archivos dentro
export async function revisarCarpeta(ruta) {
    // debemos pasar la ruta completa no solo el nombre de la carpeta
    try {
        const contenidoCarpeta = await fs.readdir(ruta, { withFileTypes: true }) // obtenemos un arreglo con todos los archivos/carpetas,
        // fileTypes permite saber si son archivos o carpetas
        const archivos = contenidoCarpeta
            .filter((elemento) => elemento.isFile())
            .map((archivo) => archivo.name)
        // obtenemos SOLO los archivos excluyendo carpetas, y luego los transformamos solo con su nombre (les quitamos las propiedades de withFileTypes)
        return archivos
    } catch (error) {
        return console.error('Error al abrir la carpeta:' + error)
    }
}

export function clasificarArchivo(archivo) {
    const extensionArchivo = path.extname(archivo)

    const categorias = {
        Imagenes: ['.jpg', '.png', '.gif'],
        Documentos: ['.pdf', '.docx', '.txt'],
        Audio: ['.mp3', '.wav'],
        Desarrollo: ['.js', '.py', '.ts', '.html', '.css', '.jsx', '.tsx'],
    }

    for (let categoria in categorias) {
        if (categorias[categoria].includes(extensionArchivo)) return categoria // si incluye una categoria la ejecucion corta y devuelve el nombre de ella
    }

    return 'Varios' // si no esta incluido en ninguna categoria, la ejecucion seguira y se cortara en varios
}
