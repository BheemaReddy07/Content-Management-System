import AdminAllUsers from "@/components/admin/all-users";
import { authOptions } from "@/lib/auth";
import IsAdmin from "@/utils/isAdmin";
import { getServerSession } from "next-auth";

export default async function AllUsesrs() {
    const session = await getServerSession(authOptions)

    if (!session) {
        return <section className="w-full h-screen justify-center items-center">
            Your are not Authenticated
        </section>
    }

    const adminCheck = await IsAdmin(session)

    if (!adminCheck) {
        return <section className="w-full h-screen justify-center items-center">
            Your are not Authorized
        </section>
    }
    

     return  <AdminAllUsers />


}