import fs from 'node:fs/promises'
import path from 'node:path'

export async function crearCarpeta(RUTA_TEMPORAL, archivos) {
    await fs.mkdir(RUTA_TEMPORAL, { recursive: true })

    for (const archivo of archivos) {
        fs.writeFile(path.join(RUTA_TEMPORAL, archivo), '')
    }
}
