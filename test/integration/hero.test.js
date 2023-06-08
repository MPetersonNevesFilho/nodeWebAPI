import test from 'node:test'
import assert from 'node:assert'
import { promisify } from 'node:util'

test('Hero Integration Test Suite', async (t) => {
    const testPort = 9009

    // bad practice, but it's just a test
    process.env.PORT = testPort
    const { server } =  await import ('../../src/index.js')

    const testServerAddress = `http://localhost:${testPort}/heroes`
    await t.test('it should create a hero', async (t) => {
        const data = {
            name: 'Chapolin Colorado',
            age: 100,
            power: 'Marreta Bionica'
        }

        const request = await fetch(testServerAddress, {
            method: 'POST',
            body: JSON.stringify(data)
        })

        assert.deepStrictEqual(
            request.headers.get('content-type'),
            'application/json',
            'The content-type header is wrong'
        )

        assert.strictEqual(request.status, 201)

        const result = await request.json()
        assert.deepStrictEqual(
            result.success,
            'Hero created successfully!',
            'The result success message is wrong'
        )

        assert.ok(
            result.id.length > 30,
            'The id is wrong'
        )

    })


    await promisify(server.close.bind(server))()
})