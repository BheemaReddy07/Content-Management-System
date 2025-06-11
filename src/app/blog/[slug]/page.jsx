import FormatDate from "@/utils/dateFormat";
import { Calendar } from "lucide-react";
import Image from "next/image";

export default function SingleBlog() {

    const tempTags = "SpaceX, NASA, Mars, Exploration, Technology";

    return (
        <section>
            <div className="flex  flex-col gap-4 items-center">
                <Image className="rounded border w-[90%] md:w-[700px]" src={"/thumbnails/dreams.png"} width={500} height={170} />
               <div className="meta-of-a-blog space-y-2">
                 <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-gray-400" />
                    <p className="text-gray-400 text-xs">Created on: {FormatDate(new Date())}</p>
                </div>
                <div className="text-xs flex items-center gap-2">
                    <p>Category:</p>
                    <p className="badge bg-gray-600/30 w-fit border border-gray-700 rounded px-2 py-1 ">Space Exploration</p>
                </div>
                <div className="text-xs flex items-center gap-2">
                    <p>Tags:</p>
                    {
                        tempTags.split(",").map(tag => 
                            <p className=" badge bg-gray-600/30 w-fit border border-gray-700 rounded px-[4px] py-[2px] ">{tag}</p>

                        )
                    }
                </div>
         
                  
               </div>
                 <p className="text-sm w-[90%] md:w-2/3 text-gray-300">In today’s fast-paced digital world, content is king—but managing it efficiently is the real challenge. Modern content creators, developers, and businesses demand tools that are not only fast but also flexible, intuitive, and scalable. That’s where the evolution of content management systems (CMS) comes in.

<br />Traditional CMS platforms focused heavily on static website updates and manual content uploads. However, the need for dynamic content, real-time editing, seamless collaboration, and integration with modern frameworks like React and Next.js has pushed CMS development to the next level.

Headless CMSs are now gaining popularity,<br /> separating content from presentation layers, which allows developers to use APIs to deliver content anywhere—web apps, mobile apps, IoT devices, and beyond. This makes content more reusable, secure, and easier to manage.

Moreover, features like WYSIWYG editors,<br /> markdown support, user roles, and real-time collaboration are becoming the norm. The integration of AI for content suggestions, SEO optimization, and even auto-tagging further enhances productivity.

Whether you're a solo blogger or a<br /> growing startup, choosing a modern CMS can significantly improve your content workflow and user experience. The key is to pick a system that balances control, speed, and ease of use—empowering creators to focus on what they do best: creating..</p>
              
            </div>

        </section>
    )
}