import { Anvil } from "lucide-react";
import Link from "next/link";

export default function Navbar(){
    const auth =false;
    return (
        <nav className="w-full px-8 h-12 flex  justify-between items-center">
            <Link href ="/" className="flex items-center gap-2">
            <Anvil />
            <span className="font-extrabold">CMS</span>
            </Link>
            {
                auth ?
                <div>Authentication is done</div>
                :<Link href="/sign-in">Sign-in</Link>
            }
        </nav>
    )
}