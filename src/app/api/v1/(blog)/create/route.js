import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ error: "UnAuthorized" }, { status: 401 });
    }

    const body = await request.json();

    const { title, slug, ogImage, content, excerpt, metaDescription, status, keywords, category } = body;
    // console.log(title, slug, ogImage, content, excerpt, metaDescription, status, keywords, "Content from API request");

    if (!title || !slug || !content || !category || !session.user.id) {
        return NextResponse.json({ message: "missing fields" }, { status: 400 })
    }
    const statusOfPost = status || "DRAFT";
    try {
        let categoryCheck = await prisma.category.findUnique({
            where: { slug: category }
        })

        if (!categoryCheck) {
            categoryCheck = await prisma.category.create({
                data: {
                    title: category.charAt(0).toUpperCase() + category.slice(1),
                    slug: category,
                }
            })
        }

        const post = await prisma.post.create({
            data: {
                title,
                content,
                slug,
                thumbnail: ogImage || null,
                desc: metaDescription || null,
                keywords: keywords || null,
                excerpt: excerpt || null,
                authorId: session.user.id,
                catSlug: categoryCheck.slug,
                status: statusOfPost,


            }
        })
        return NextResponse.json(post, { status: 201 })
    }


    catch (error) {
        console.log(error.message)
        return NextResponse.json({ message: "Post saving failed" }, { status: 500 })
    }
}