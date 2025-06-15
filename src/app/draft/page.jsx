"use client";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

export default async function Draft() {
    const savePost = async ({ title, slug, ogImage, content, excerpt, metaDescription, status, keywords ,category }) => {

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/create`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json,' },
                body: JSON.stringify({title, slug, ogImage, content, excerpt, metaDescription, status, keywords ,category}),
                cache: "no-store"
            })
            if(!res.ok){
                throw new Error ("Post Saving Failed")
            }
    }
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Create a new Post</h1>

            <Editor onSave={savePost} />
        </div>
    )
}