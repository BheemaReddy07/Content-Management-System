import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { slug } = params;
    const post = await prisma.post.findUnique({
        where: {
            slug: slug,
            status: "PUBLISHED",
        },
        include: {
            author: {
                select: {
                    name: true,
                    image: true,
                }
            }
        }
    })
    console.log(post, "post singel got from prisma")
    if (!post) {
        return NextResponse.json({ message: "Post not Found" }, { status: 404 })
    }
    return NextResponse.json(post, { status: 200, headers: { 'content-Type': "application/json" } })
}