import { once } from 'node:events'

const routes = ({
    heroRoute
}) => ({
    '/heroes:get': async (request, response) => {
        // throw new Error('Deu ruim')
        response.write("Hello, this is the heroes route")
        response.end()
    },

    '/heroes:post': async (request, response) => {
        // throw new Error('Deu ruim')
        const data = await once(request, 'data')
        const item = JSON.parse(data)
        const hero = new Hero(item)
        const id = hero.id
        response.writeHead(201, DEFAULT_HEADER)
        response.write(JSON.stringify({
            id,
            success: 'Hero created successfully!',
            })
        )
        response.end()
    },
})

export {
    routes
}