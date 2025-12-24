import { test } from 'node:test' // ejecuta las pruebas
import assert from 'node:assert' // compara resultados
import { revisarCarpeta } from '../../src/organizador'

test('Revisar carpetas', async (t) => {
    await t.test('Lee la carpeta y devuelve solo sus archivos', () => {
        const archivos = revisarCarpeta('../pruebas')
        assert.strictEqual(archivos.length, 1) // archivo.txt (excluye la carpeta "otra")
    })
})
