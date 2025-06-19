import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
    const posts = await prisma.post.findMany({
        where: { status: "PUBLISHED" }
    })
    return NextResponse.json(posts, {
        status: 200, headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store , no-cache,must-revalidate",
        }
    })
}