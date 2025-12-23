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
    const extensionArchivo = path.extname(archivo).toLocaleLowerCase()

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

export async function crearYmoverCarpetas(arregloArchivos, ruta) {
    //la ruta q pasa el usuario de la carpeta que quiere revisar
    try {
        console.log('Trabajando en los archivos ....')
        // Creamos un arreglo de promesas
        const promesas = arregloArchivos.map(async (archivo) => {
            const categoria = clasificarArchivo(archivo)
            const nuevaRutaCategoria = path.join(ruta, categoria) // arma la ruta a la carpeta

            await fs.mkdir(nuevaRutaCategoria, { recursive: true }) //recursive:true = si ya existe la carpeta ignora el error

            const rutaViejaArchivo = path.join(ruta, archivo) // forma la ruta completa del archivo viejo
            const nuevaRutaArchivo = path.join(nuevaRutaCategoria, archivo) // forma la ruta completa al archivo nuevo

            return fs.rename(rutaViejaArchivo, nuevaRutaArchivo) // mueve el archivo a la nueva carpeta
        });

        // ejecuta todo en paralelo
        await Promise.all(promesas)

        console.log('Organización exitosa')
    } catch (error) {
        console.log('Ha ocurrido un error al intentar organizar los archivos' + error)
    }
}
