import { NextResponse } from "next/server"

const allowedOrigins = [
 "http://localhost:3000",
  "https://your-frontend-domain.com",   
]

export function middleware(request) {
  const origin = request.headers.get("origin")
  console.log("Request Origin:", origin);

  // Allow only if origin is in allowed list
  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(
      JSON.stringify({ message: "CORS blocked: Unauthorized origin" }),
      {
        status: 403,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/api/:path*", // Apply CORS check only for API routes
}
