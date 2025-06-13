"use client";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

export default function Draft() {
    const savePost = ({ title, slug, ogImage, content, excerpt, metaDescription, status, keywords }) => {
        console.log("slug saved", { slug });
        console.log("ogImage saved", { ogImage });
    }
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Create a new Post</h1>

            <Editor onSave={savePost} />
        </div>
    )
}