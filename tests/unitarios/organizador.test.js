import { describe, it, beforeEach, afterEach } from 'node:test' // ejecuta las pruebas
import assert from 'node:assert' // compara resultados
import path from 'node:path'
import fs from 'node:fs/promises'
import { clasificarArchivo, crearYmoverCarpetas, revisarCarpeta } from '../../src/organizador.js'
import { crearCarpeta } from './utils/crearCarpeta.js'

const RUTA = path.resolve('./tests/pruebas')
const ARCHIVOS = ['archivo.pdf', 'texto.txt', 'audio.mp3']
const RUTA_TEMPORAL = path.resolve('./tests/carpeta-temporal')

describe('Revisar carpeta', async () => {
    await it('Leer la carpeta y obtener sus archivos', async () => {
        // Act
        const archivos = await revisarCarpeta(RUTA)
        // Assert
        assert.equal(archivos.length, 3) // saltea la carpeta
        assert.deepStrictEqual(archivos.sort(), ARCHIVOS.sort()) // compara en profundidad
        // ordena con .sort() porque readdir no siempre lee de la misma manera
    })

    await it('Lanzar un error si no se logró leer la carpeta correctamente', async () => {
        await assert.rejects(revisarCarpeta('carpeta/que/no/existe'), {
            name: 'Error',
            message: /^Error al abrir la carpeta:/,
        })
    })
})

describe('Clasificar archivo', async () => {
    await it('Clasifica un archivo de texto como "Documentos" según su extensión (.txt)', () => {
        // Act
        const categoria = clasificarArchivo('texto.txt')
        // Assert
        assert.equal(categoria, 'Documentos')
    })

    await it('Clasifica un archivo de audio como "Audio" según su extensión (.mp3)', () => {
        // Act
        const categoria = clasificarArchivo('audio.mp3')
        // Assert
        assert.equal(categoria, 'Audio')
    })
})

describe('Crea carpetas y mueve archivos', async () => {
    // Crea una carpeta temporal con archivos dentro antes de cada test
    beforeEach(async () => {
        await crearCarpeta(RUTA_TEMPORAL, ARCHIVOS)
    })

    // Luego de cada test borra la carpeta
    afterEach(async () => {
        await fs.rm(RUTA_TEMPORAL, { recursive: true, force: true })
    })

    await it('Crea carpetas con las categorías y mueve los archivos correspondientes dentro de ellas', async () => {
        // Act
        await crearYmoverCarpetas(ARCHIVOS, RUTA_TEMPORAL)
        // Assert
        const archivoClasificado = await fs.stat(path.join(RUTA_TEMPORAL, 'Documentos', 'archivo.pdf')) // verificar que la carpeta "Documentos" se creó y contiene el PDF
        assert.ok(archivoClasificado.isFile())
    })
})
