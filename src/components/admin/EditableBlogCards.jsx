"use client"
import FormatDate from "@/utils/dateFormat";
import { useState } from "react";
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";


export default function EditableBlogCards({ post }) {
    const [currentStatus, setCurrentStatus] = useState(post.status)
    const Router = useRouter();

    const handleDelete = async (id) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/delete/${post.id}`, 
            {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                cache: "no-store"
            })
        if (res.ok) {
            setCurrentStatus("DELETE");
            Router.refresh();
        }

    }

    const handleCovertToDraft = async (id) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/state`,
            
             {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: "DRAFT" }),
                cache: "no-store"
            })

        if (res.ok) {
            setCurrentStatus("DRAFT")
            Router.refresh()
        }
    }

    const publishABlog = async (id) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/state` , {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status: "PUBLISHED" }),
            cache: "no-store"

        })

        if (res.ok) {
            setCurrentStatus("PUBLISHED")
            Router.refresh()
        }
    }

    return (
        <div className="flex">
            <div className="bg-gray-600/30 p-3 rounded-lg  w-full flex gap-3 flex-col sm:flex-row md:flex-row justify-between">
                <div> <h2 className="font-bold text-lg"> {post.title.substring(0, 25)}...</h2>
                    <p className="text-sm  text-gray-300"> {post.excerpt.substring(0, 15)}...</p>
                    <span className="text-xs text-gray-400 ">{FormatDate(post.createdAt)}</span>
                </div>
                <div className="space-x-2 flex items-center  gap-3   ">
                    {currentStatus === "PUBLISHED" ? <Button onClick={() => handleCovertToDraft(post.id)} variant="outline">Convert to Draft</Button> : <Button onClick={() => publishABlog(post.id)} variant="outline">Publish</Button>}
                    {currentStatus === "PUBLISHED" && <Button onClick={() => Router.push(`/blog/${post.slug}`)}>View</Button>}
                    <Trash2Icon onClick={() => handleDelete(post.id)} className="size-5 text-gray-400 hover:cursor-pointer" />
                </div>
            </div>
        </div>
    )
}