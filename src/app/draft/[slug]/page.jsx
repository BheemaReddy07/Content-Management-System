"use client";
import { toast } from "@/hooks/use-toast";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

export default function EditPreviousDraft({ params }) {
    const { slug } = params;
    const [post, setPost] = useState();


    useEffect(() => {
        const fetchPost = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/update/${slug}`,{ cache: "no-store"})

            if (!res.ok) {
                if (res.status === 403) {
                    toast({
                        title: "Uh Oh!",
                        description: "You are not allowed to edit the post",
                        variant: 'destructive'
                    })
                }
                else toast({
                    title: "Uh Oh!",
                    description: "Unable to load Post",
                    variant: 'destructive'
                })
            }
            const response = await res.json();

            setPost(response);

        }
        fetchPost();

    }, [slug])




    const savePost = async ({ title, ogImage, content, excerpt, metaDescription, status, keywords }) => {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/update/${slug}`,
            {
                method: "PUT",
                headers: { 'content-Type': 'application/json' },
                body: JSON.stringify({ title, ogImage, content, excerpt, metaDescription, status, keywords, }),
                cache: "no-store"
            })
        if (!res.ok) {
            throw new Error("Post Upadating Failed")
        }

    }
    if (!post) {
        return <></>
    }
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Create a new Post</h1>

            <Editor onSave={savePost} initialData={post} />
        </div>
    )
}