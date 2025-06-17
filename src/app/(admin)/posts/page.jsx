import AdminAllPosts from "@/components/admin/admin-all-posts"
import UserAllPosts from "@/components/admin/user-all-posts";
import { authOptions } from "@/lib/auth"
import IsAdmin from "@/utils/isAdmin"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export default async function AllPosts({searchParams}){
    const page = searchParams.page || 1;
    const category = searchParams.cat;

    const session =await getServerSession(authOptions)
    if(!session){
        redirect("/sign-in");
    }

    const adminCheck =await IsAdmin(session)

    if(!adminCheck){
        return <UserAllPosts page={page} category={category} user={session.user} />
    }


    return (
        <div>
            
            <AdminAllPosts page={page} category={category} />
        </div>
    )
}