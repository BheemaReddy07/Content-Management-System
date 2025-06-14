import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import IsAdmin from "@/utils/isAdmin";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export  async function PATCH(request) {

    const { id, status } = await request.json();

    if (!["DRAFT", "PUBLISHED", "ARCHIVED", "DELETED"].includes(status)) {
        return NextResponse.json({ message: "Invalid status" }, { status: 400 })

    }

    const session = await getServerSession(authOptions)
    const adminCheck = await IsAdmin(session)

    const grabPost = await prisma.post.findUnique({
        where: { id },
    })

    const isAuthor = grabPost === session.user.id
    if (isAuthor || adminCheck) {
        const updatedPost = await prisma.post.update({
            where: { id },
            data: { status }
        })

        return NextResponse.json(updatedPost, { status: 200 })
    }

    return NextResponse.json({ message: "Not Authorized" }, { status: 400 })



}