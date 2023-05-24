import {NextResponse} from "next/server";

export function middleware(req) {
    const basicAuth = req.headers.get('authorization')
    const url = req.nextUrl

    if (basicAuth) {
        const authValue = basicAuth.split(' ')[1]
        const [user, pwd] = Buffer.from(authValue, 'base64').toString().split(':');

        if (user === process.env.NEXT_BASIC_AUTH_USER && pwd === process.env.NEXT_BASIC_AUTH_PASS) {
            return NextResponse.next()
        }
    }

    return new Response('Auth required', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
    })
}
