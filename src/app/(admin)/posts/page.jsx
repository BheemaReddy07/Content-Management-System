import AdminAllPosts from "@/components/admin/admin-all-posts"
import { authOptions } from "@/lib/auth"
import IsAdmin from "@/utils/isAdmin"
import { getServerSession } from "next-auth"

export default async function AllPosts({searchParams}){
    const page = searchParams.page || 1;
    const category = searchParams.cat;

    const session =await getServerSession(authOptions)

    const adminCheck = IsAdmin(session)

    if(!adminCheck){
        return <div>Not accessible</div>
    }


    return (
        <div>
            
            <AdminAllPosts page={page} category={category} />
        </div>
    )
}