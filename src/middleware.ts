import withAuth from "./middleware/withAuth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function mainMiddleware(req: NextRequest) {
    // const isLogin = false;
    // if(isLogin) {
    //     return NextResponse.next();
    // } else {
    //     return NextResponse.redirect(new URL('/auth/login', req.url));
    // }
    const res = NextResponse.next();
    return res;
}

// export const config = {
//     matcher: ["/product", "/about"]
// }

export default withAuth(mainMiddleware, ["/profile", "/admin"]);