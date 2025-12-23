// Lógica para clasificar y mover archivos
import fs from 'node:fs/promises'
import path from 'node:path'

// Abre la carpeta y devuelve sus archivos
export async function revisarCarpeta(ruta) {
    try {
        const contenidoCarpeta = await fs.readdir(ruta, { withFileTypes: true }) // obtiene un arreglo con todos el contenido

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

    const categorias = {
        Imagenes: ['.jpg', '.png', '.gif'],
        Documentos: ['.pdf', '.docx', '.txt'],
        Audio: ['.mp3', '.wav'],
        Desarrollo: ['.js', '.py', '.ts', '.html', '.css', '.jsx', '.tsx'],
    }

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

        console.log('Organización exitosa')
    } catch (error) {
        throw new Error(
            'Ha ocurrido un error al intentar mover los archivos' +
                error.message
        )
    }
}
