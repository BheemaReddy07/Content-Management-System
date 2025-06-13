import { Anvil, User } from "lucide-react";
import Link from "next/link";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { getAuthSession } from "@/lib/auth";
import Image from "next/image";
import SignOut from "./signOut";
export default async function Navbar() {
    const session = await getAuthSession();



    return (
        <nav className="w-full px-8 h-12 flex  justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
                 <Image src="/writely.jpg" className="rounded-full" alt="Writely" width={36} height={36} />
                <span className=" text-xl font-extrabold text-blue-500">Writely</span>
            </Link>
            {
                session ?
                    (<UserModalComponent user={session?.user} />)
                    : <Link href="/sign-in">Sign-in</Link>
            }
        </nav>
    )
}


const UserModalComponent = ({ user }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Image src={user.image} alt={user.name} width={40} height={40} className="rounded-full border-2 border-[greenyellow]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Hi {user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link className="flex items-center gap-2 " href={`/profile/${user.username}`}><User className="w-4" />  Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <SignOut />
                </DropdownMenuItem>
                 
            </DropdownMenuContent>
        </DropdownMenu>
    )
}