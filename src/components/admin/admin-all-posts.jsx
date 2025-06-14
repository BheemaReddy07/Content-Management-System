import { getAllBlogs } from "@/app/actions/getBlogs"
import EditableBlogCards from "@/components/admin/EditableBlogCards"

export default async function AdminAllPosts({page,category}) {

    const { posts, count } = await getAllBlogs({page,category})



    return (
        <section className="p-8 flex flex-col gap-4 ">
            <h2>Manage All the Blogs</h2>
              {
                posts.map(post=>{
                    return <EditableBlogCards key={post.id} post={post} />
                })
              }
        </section>
    )
}