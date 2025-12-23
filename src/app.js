import { revisarCarpeta, crearYmoverCarpetas } from './organizador.js'

// Flujo principal del programa
async function App() {
    const rutaUsuario = process.argv[2] // toma la ruta ingresada por terminal

    if (!rutaUsuario) {
        console.error('No se ha recibido ninguna ruta')
        process.exit(1)
    }

    try {
        const archivos = await revisarCarpeta(rutaUsuario)
        await crearYmoverCarpetas(archivos, rutaUsuario)

        if (archivos.length === 0) {
            console.log('No hay archivos para organizar.')
            return
        }
    } catch (error) {
        console.error(
            'Ha ocurrido un error al intentar organizar la carpeta' +
                error.message
        )
    }
}

App()
