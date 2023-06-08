import { parse } from 'node:url'


function handler (request, response) {
    const {
        method,
        url
    } = request

    const {
        pathname,
        searchParams
    } = parse(url, true)

    const key = `${pathname}:${method.toLowerCase()}`

    console.log({ key });
    console.log({  method, url });

    response.end('Hello World')
}

export default handler