"use client"
import ShareButton from "@/components/shareButton";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

export default function Blogs() {
  const [blogInfo, setBlogInfo] = useState([]);


  useEffect(() => {
    const blogData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/get`, { cache: "no-store", next: { revalidate: 0 } });
        const information = await res.json();
        setBlogInfo(information);

      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    }
    blogData();
    const interval = setInterval(blogData, 5000)
    return () => clearInterval(interval)

  }, [])

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-8">
      {blogInfo.map((blog, index) => (
        <BlogCard key={index} title={blog.title} excerpt={blog.excerpt} image={blog.thumbnail} url={blog.slug} />
      ))}
    </section>
  );
}



const BlogCard = ({ title, excerpt, image, url }) => {

  return <div className="bg-gray-400/20 rounded-lg gap-1 border flex flex-col p-1 hover:scale-105 transition-all duration-200 delay-100 cursor-pointer">
    {image && <Image className="w-full rounded-md" src={image} alt={title} width={300} height={170} />}
    <h2 className="text-xl font-bold text-gray-200 " >{title}</h2>
    <p className="text-sm text-gray-400">{excerpt.substring(0, 200)}</p>
    <div className="flex justify-between items-center">
      <Link className="bg-zinc-600/70 py-2 px-3 rounded w-fit text-xs bottom-1 " href={`blog/${url}`}>Read More</Link>
      <ShareButton slug={url} title={title} />
    </div>
  </div>
}