import { describe, it } from 'node:test' // ejecuta las pruebas
import assert from 'node:assert' // compara resultados
import path from 'node:path'
import { clasificarArchivo, revisarCarpeta } from '../../src/organizador.js'

describe('Revisar carpeta', async () => {
    await it('Leer la carpeta y obtener sus archivos', async () => {
        // Arrange
        const rutaUsuario = path.resolve('./tests/pruebas')
        // Act
        const archivos = await revisarCarpeta(rutaUsuario)
        // Assert
        assert.equal(archivos.length, 2) // saltea la carpeta
        assert.deepStrictEqual(archivos.sort(), ['archivo.pdf', 'texto.txt'].sort()) // compara en profundidad
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
    await it('Clasifica un archivo de texto como "Documentos" según su extensión (.txt)', async () => {
        // Act
        const categoria = clasificarArchivo('texto.txt')
        // Assert
        assert.equal(categoria, 'Documentos')
    })

    await it('Clasifica un archivo de audio como "Audio" según su extensión (.mp3)', async () => {
        // Act
        const categoria = clasificarArchivo('audio.mp3')
        // Assert
        assert.equal(categoria, 'Audio')
    })
})
