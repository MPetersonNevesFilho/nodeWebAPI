import { parse } from 'node:url'
import { DEFAULT_HEADER } from './util/util.js'
import { routes } from './routes/heroRoute.js'

const heroRoutes = routes({
    heroService: {}
})
const allRoutes = {
    ...heroRoutes,
    // 404 route
    default: (request, response) => {
        response.writeHead(404, DEFAULT_HEADER)
        response.write('Hello, this is the default route, error 404')
        response.end()
    }
}

function handler (request, response) {
    const {
        method,
        url
    } = request

    const {
        pathname,
    } = parse(url, true)

    const key = `${pathname}:${method.toLowerCase()}`
    const chosen = allRoutes[key] || allRoutes.default

    return Promise.resolve(chosen(request, response))
        .catch(handlerError(response))
}

function handlerError (response){
    return error =>{
        console.error('Deu ruim**', error.stack)
        response.writeHead(500, DEFAULT_HEADER)
        response.write(JSON.stringify({
            error: error.message || 'Internal Server Error'
        }))
        return response.end()
    }
}

export default handler