import FormatDate from "@/utils/dateFormat";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import '@/styles/blog.css'
import { notFound } from "next/navigation";
const fetchSingleBlog = async (slug) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/get/${slug}`, {
            next: { tags: [slug] },
            cache: "no-store",
        });

        if (res.status == 404) {
            notFound();
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error.message)
    }
}


export async function generateMetadata({ params }) {
    const res = await fetchSingleBlog(params.slug);
    if (!res) return { title: "Post not found" };
    return {
        title: res.title,
        description: res.excerpt,
        openGraph: {
            images: [`${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${res.title}`]
        }
    }
}


export default async function SingleBlog({ params }) {
    const { slug } = params
    const post = await fetchSingleBlog(slug)
    if (!post) notFound();

    const tempTags = "SpaceX, NASA, Mars, Exploration, Technology";


    return (
        <section>

            <div className="flex flex-col gap-4 items-center">
                {post.thumbnail && <Image className="rounded border w-[90%] md:w-[700px]" src={post.thumbnail} width={500} height={250} alt={post.title} />}
                <h1 className="text-2xl md:text-4xl font-bold px-4">{post.title}</h1>
                <div className="meta-of-a-blog space-y-2">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex gap-2 items-center">
                            <Calendar className="text-gray-400 size-4" />
                            <p className="text-gray-400 text-xs">Created on: {FormatDate(post.createdAt)}</p>
                        </div>
                        <Link className="flex items-center gap-2" href={`/user/${post.author.username}`}>
                            <Image className="rounded-full" src={post.author.image} alt={post.author.username} width={20} height={20} />
                            <p className="text-xs text-gray-400">{post.author.name}</p>
                        </Link>
                    </div>
                    <div className="text-xs flex items-center gap-2">
                        <p>Category:</p>
                        <p className="badge bg-gray-600/30 border border-gray-700 w-fit px-2 py-1 rounded">{post.catSlug}</p>
                    </div>
                    {post?.keywords && <div className="text-xs flex items-center gap-2">
                        <p>Tags:</p>
                        {post?.keywords.substring(0,35).split(",").map((tag, index) => <p key={`${tag}_${index}`} className="badge bg-gray-600/30 border border-gray-700 w-fit px-[4px] py-[2px] rounded">{tag}</p>)}
                    </div>}
                </div>
                <div className="blogContent text-sm w-[90%] md:w-2/3 text-gray-300 mb-5" dangerouslySetInnerHTML={{ __html: post.content }}>
                </div>
            </div>

        </section>
    )
}