"use client";
import { Icons } from "@/components/Icons";
import { useToast } from "@/hooks/use-toast";
import { Anvil } from "lucide-react";
import { signIn } from "next-auth/react";
import { use, useState } from "react";

export default function SignIn() {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const onSignIn = async () => {
        try {
            setLoading(true);
            await signIn("google")
        } catch (error) {
            console.log("Error signing in:", error)
            toast({
                title: "Error signing in",
                description: "There was an error signing in with Google. Please try again later.",
                variant: "destructive"
            })
        } finally {
            setLoading(false);
        }
    }

    return <section className="w-full flex h-screen items-center justify-center">
        <div className="w-full sm:w-1/2 flex flex-col items-center  gap-4 p-4 rounded-lg md:w-1/5 mx-4  bg-zinc-800">
            <Anvil className="size-12  text-gray-300" />
            <p className="text-sm text-gray-200 text-center">Welcome ,By continuing with CMS sign in ,you will be geek</p>
            <button onClick={onSignIn} className="flex gap-2 items-center bg-gray-500/50 px-5 py-2 rounded font-bold text-sm  hover:bg-gray-500/40 transition-colors duration-200"><Icons.GoogleLogo className="size-7" />{loading ? "Loading..." : "Sign In"}</button>

        </div>
    </section>
}