import { NextResponse } from "next/server";
import { authenticatedUser } from "./utils/amplify-server-utils";

export async function middleware(request) {
    const response = NextResponse.next();
    const user = await authenticatedUser({ request, response });

    const { pathname } = request.nextUrl;
    const isOnDashboard = pathname.startsWith("/dashboard");
    const isOnAdminArea = pathname.startsWith("/dashboard/admin");

    if (isOnDashboard) {
        if (!user) {
            return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
        }       
        if (isOnAdminArea && !user.isAdmin) {
            return pathname !== "/dashboard"
                ? NextResponse.redirect(new URL("/dashboard", request.nextUrl))
                : response;
        }
        return response;
    }
    if (user && pathname !== "/dashboard") {
        return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }
    return response;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};