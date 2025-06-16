"use client"


import { Copy } from "lucide-react";
import { useState } from "react"

export default function ShareButton({ slug, title }) {
    const [copied, setCopied] = useState(false)

    const handleShare = async () => {
        const blogUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${slug}`;
        try {
            if (navigator.share) {
                await navigator.share({ title: title, url: blogUrl })
            } else {
                await navigator.clipboard.writeText(blogUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 5000);
            }

        } catch (error) {
            console.error("Failed to copy", error)
        }

    }
    return (
        <button onClick={handleShare} className="flex items-center gap-1 text-sm text-gray-500 hover:text-black">
            <Copy className="w-4 h-4" />
            {copied ? "Copied!" : "Share"}
        </button>
    )
}