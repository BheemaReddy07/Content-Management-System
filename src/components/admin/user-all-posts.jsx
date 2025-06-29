import { getAllBlogs, getUserBlogs } from "@/app/actions/getBlogs"
import EditableBlogCards from "@/components/admin/EditableBlogCards"
import Pagination from "../pagination"
import { config } from "@/static/config"
import CategoryFilter from "../category-filter"

export default async function UserAllPosts({ page, category ,user }) {

    const { posts, count } = await getUserBlogs({ page, category, userId:user.id })



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