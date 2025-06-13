import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

export default function Draft() {
    
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Draft</h1>
            <p className="text-gray-600 mb-6">Create a new post</p>
             <Editor />
        </div>
    )
}