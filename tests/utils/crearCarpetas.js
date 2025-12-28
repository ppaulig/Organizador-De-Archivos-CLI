import fs from 'node:fs/promises'
import path from 'node:path'

export async function crearCarpetaSinClasificar(RUTA_TEMPORAL, archivos) {
    await fs.mkdir(RUTA_TEMPORAL, { recursive: true })

    // Crea una carpeta demás para verificar que sea ignorada
    await fs.mkdir(path.join(RUTA_TEMPORAL, 'Carpeta-ignorada'), { recursive: true })

    for (const archivo of archivos) {
        await fs.writeFile(path.join(RUTA_TEMPORAL, archivo), '')
    }
}

export async function crearCarpetasClasificadas(RUTA_TEMPORAL) {
    await fs.mkdir(path.join(RUTA_TEMPORAL, 'Documentos'), { recursive: true })
    await fs.mkdir(path.join(RUTA_TEMPORAL, 'Audio'), { recursive: true })

    await fs.writeFile(path.join(RUTA_TEMPORAL, 'Documentos', 'texto.txt'), '')
    await fs.writeFile(path.join(RUTA_TEMPORAL, 'Documentos', 'archivo.pdf'), '')
    await fs.writeFile(path.join(RUTA_TEMPORAL, 'Audio', 'audio.mp3'), '')
}
