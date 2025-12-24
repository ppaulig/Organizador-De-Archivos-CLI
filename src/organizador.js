// Lógica para clasificar y mover archivos
import fs from 'node:fs/promises'
import path from 'node:path'
import util from 'node:util'
import { categorias } from './utils.js'

// Abre la carpeta y devuelve sus archivos
export async function revisarCarpeta(ruta) {
    try {
        const contenidoCarpeta = await fs.readdir(ruta, { withFileTypes: true }) // obtiene un arreglo con todo el contenido

        const archivos = contenidoCarpeta
            .filter((elemento) => elemento.isFile()) // obtiene solo los archivos, excluyendo carpetas
            .map((archivo) => archivo.name) // le quita las propiedades de withFileTypes

        return archivos
    } catch (error) {
        throw new Error('Error al abrir la carpeta:' + error.message)
    }
}

// Recibe un archivo, lo clasifica y devuelve el nombre de la categoría
function clasificarArchivo(archivo) {
    const extensionArchivo = path.extname(archivo).toLowerCase() // obtiene la extensión del archivo

    for (let categoria in categorias) {
        if (categorias[categoria].includes(extensionArchivo)) return categoria // itera cada categoría y devuelve su nombre si coincide la extesión
    }

    return 'Varios' // si la extensión no coincide con ninguna categoría definida, será "Varios"
}

// Crea las carpetas según las categorías y mueve los archivos correspondientes a ellas
export async function crearYmoverCarpetas(arregloArchivos, ruta) {
    try {
        console.log('Trabajando en los archivos ....')

        const promesas = arregloArchivos.map(async (archivo) => {
            const categoria = clasificarArchivo(archivo)
            const rutaCarpetaCategoria = path.join(ruta, categoria) // arma la ruta a la carpeta de la categoría

            await fs.mkdir(rutaCarpetaCategoria, { recursive: true }) // si no existe la carpeta, la crea

            const rutaOriginalArchivo = path.join(ruta, archivo) // forma la ruta original del archivo
            const nuevaRutaArchivo = path.join(rutaCarpetaCategoria, archivo) // forma la ruta nueva del archivo

            return fs.rename(rutaOriginalArchivo, nuevaRutaArchivo) // mueve el archivo a la nueva carpeta
        })

        await Promise.all(promesas) // ejecuta todo en paralelo

        console.log(util.styleText(['green'], `Organización exitosa: ${arregloArchivos.length} archivos movidos`))
    } catch (error) {
        throw new Error('Ha ocurrido un error al intentar mover los archivos' + error.message)
    }
}

export async function verArchivosClasificados(ruta) {
    try {
        // Ve las carpetas que se crearon
        const contenidoCarpeta = await fs.readdir(ruta, { withFileTypes: true }) // obtiene un arreglo con todo el contenido

        const carpetas = contenidoCarpeta
            .filter((elemento) => elemento.isDirectory()) // obtiene solo las carpetas, excluyendo archivos
            .map((carpeta) => carpeta.name) // le quita las propiedades de withFileTypes

        // Busca las carpetas de categorías creadas
        const nombresCategorias = Object.keys(categorias)
        const carpetasCategorias = carpetas.filter(
            (carpeta) => nombresCategorias.includes(carpeta) || carpeta == 'Varios'
        )

        // Muestra los archivos organizados de las carpetas
        console.log(util.styleText(['bold'], 'Visualización de archivos organizados en sus carpetas'))
        for (const carpeta of carpetasCategorias) {
            const rutaCarpeta = path.join(ruta, carpeta)
            const archivos = await fs.readdir(rutaCarpeta)

            console.log(util.styleText(['gray', 'bold'], `${carpeta}:`))
            for (const archivo of archivos) console.log(`- ${archivo}`)
        }
    } catch (error) {
        throw new Error('Error al ver la clasificación de archivos:' + error.message)
    }
}
