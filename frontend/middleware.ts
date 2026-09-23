import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Pages that require the user to be logged in, THIS CAN BE EDITED
const PRIVATE_ROUTES = [
    "/dashboard",
    "/products",
    "/settings",
];

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Only check authentication for private pages
    if (PRIVATE_ROUTES.includes(pathname)) {
        const response = await fetch(
            "http://localhost:4000/api/auth/get-session",
            {
                headers: {
                    Cookie: request.headers.get("cookie") || "",
                },
            }
        );

        const session = await response.json();

        // No valid session
        if (!session) {
            return NextResponse.redirect(
                new URL("/login", request.url)
            );
        }
    }

    return NextResponse.next();
}

// runs the middleware in these pages
export const config = {
    matcher: [
        "/dashboard",
        "/products",
        "/settings",
    ],
};