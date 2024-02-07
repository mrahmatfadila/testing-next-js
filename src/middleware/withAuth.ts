import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

const onlyAdmin = ["/admin"]

export default function withAuth(middleware: NextMiddleware, requireAuth: string[] = []) {
    return async (req: NextRequest, next: NextFetchEvent) => {
        const pathname = req.nextUrl.pathname;
        if(requireAuth.includes(pathname)) {
            const token = await getToken({
                req,
                secret: process.env.NEXTAUTH_SECRET
            });
            // untuk redirect ke halaman login jika tidak ada token
            if(!token) {
                const url = new URL('/auth/login', req.url);
                url.searchParams.set('callbackUrl', encodeURI(req.url));
                return NextResponse.redirect(url);
            }
            // untuk redirect ke halaman admin jika role bukan admin
            if(token.role !== 'admin' && onlyAdmin.includes(pathname)) {
                return NextResponse.redirect(new URL('/', req.url));
            }
            return middleware(req, next);
        }
    }
}