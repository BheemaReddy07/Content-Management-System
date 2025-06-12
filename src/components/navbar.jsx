import { Anvil } from "lucide-react";
import Link from "next/link";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function Navbar() {
    const auth = true;
const tempUser ={
    name:"Jaddu",
    username:"Jaddu__123"
}

    return (
        <nav className="w-full px-8 h-12 flex  justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
                <Anvil />
                <span className="font-extrabold">CMS</span>
            </Link>
            {
                auth ?
                   (<UserModalComponent user={tempUser}/>)
                    : <Link href="/sign-in">Sign-in</Link>
            }
        </nav>
    )
}


const UserModalComponent = ({ user }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>user</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>HI {user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href={`/profile/${user.username}`}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}