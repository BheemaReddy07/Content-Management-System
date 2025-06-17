import { getAllBlogs } from "@/app/actions/getBlogs"
import EditableBlogCards from "@/components/admin/EditableBlogCards"
import Pagination from "../pagination"
import { config } from "@/static/config"
import CategoryFilter from "../category-filter"

export default async function AdminAllPosts({ page, category }) {

    const { posts, count } = await getAllBlogs({ page, category })



    return (
        <section className="p-8 flex flex-col gap-4 ">
            <h2>Manage All the Blogs</h2>
            <CategoryFilter />
            {
                posts.map(post => {
                    return <EditableBlogCards key={post.id} post={post} />
                })
            }
              <Pagination className="mt-8 sm:fixed sm:bottom-10 sm:left-1/2 sm:-translate-x-1/2" currentPage={page} totalItems={count} perPage={config.perPage} />
        </section>
    )
}