import {
    revisarCarpeta,
    crearYmoverCarpetas,
    verArchivosClasificados,
} from './organizador.js'
import path from 'node:path'

// Flujo principal del programa
async function App() {
    const rutaBruta = process.argv[2] // toma la ruta ingresada por terminal

    const rutaUsuario = rutaBruta ? path.resolve(rutaBruta) : null // convierte una ruta relativa a absoluta

    if (!rutaUsuario) {
        console.error('No se ha recibido ninguna ruta')
        process.exit(1)
    }

    try {
        const archivos = await revisarCarpeta(rutaUsuario)

        if (archivos.length === 0) {
            console.log('No hay archivos para organizar.')
            return
        }

        await crearYmoverCarpetas(archivos, rutaUsuario)
        console.log('')
        await verArchivosClasificados(rutaUsuario)
    } catch (error) {
        console.error(
            'Ha ocurrido un error al intentar organizar la carpeta' +
                error.message
        )
    }
}

App()
