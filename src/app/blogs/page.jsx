import Image from "next/image";
import Link from "next/link";

const blogConfig = [
  {
    title: "React vs NextJS",
    excerpt: "This is the description for my first blog.",
    image: "/thumbnails/react-v-next.png",
    url: "/demo-slug",
  },
  {
    title: "dreams developer Blog",
    excerpt: "This is the description for my second blog.",
    image: "/thumbnails/dreams.png",
    url: "/demo-slug",
  },
  {
    title: "Backend developer Blog",
    excerpt: "This is the description for my Third blog.",
    image: "/thumbnails/become-backend-dev.png",
    url: "/demo-slug",
  },
];

export default function Blogs() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 gap-4 p-8">
      {blogConfig.map((blog, index) => (
         <BlogCard key={index} title={blog.title} excerpt={blog.excerpt} image={blog.image} url={blog.url} />
      ))}
    </section>
  );
}



const BlogCard = ({ title, excerpt, image,url }) => {

    return <div className="bg-gray-400/20 rounded-lg gap-1 border flex flex-col p-1 hover:scale-105 transition-all duration-200 delay-100 cursor-pointer">
        <Image className="w-full rounded-md" src={image} alt={title} width={300} height={170} />
        <h2 className="text-xl font-bold text-gray-200 " >{title}</h2>
        <p className="text-sm text-gray-400">{excerpt}</p>
        <Link className="bg-zinc-600/70 py-2 px-3 rounded w-fit text-xs" href={`blog${url}`}>Read More</Link>
         
    </div>
}