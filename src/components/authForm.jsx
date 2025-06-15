"use client";
import { Icons } from "@/components/Icons";
import { useToast } from "@/hooks/use-toast";
import { Anvil } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


export default function AuthForm({ origin }) {

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


    return (
        <div className="w-full sm:w-1/2  flex flex-col items-center  gap-4 p-4 rounded-lg md:w-2/5 lg:w-2/6  mx-4  bg-zinc-800">
            <Image src="/writely.jpg" width={40} height={40} className="size-12  text-gray-300 rounded-full" />
            <p className="text-sm text-gray-200 text-center">{origin==="signup"?"Welcome ,By continuing with Writely sign in ,you will be geek":"Welcome back ,hope to you have back"}</p>
            <button onClick={onSignIn} className="flex gap-2 items-center bg-gray-500/50 px-5 py-2 rounded font-bold text-sm  hover:bg-gray-500/40 transition-colors duration-200"><Icons.GoogleLogo className="size-7" />{loading ? "Loading..." : origin==="signup" ? "Sign Up":"Sign In"}</button>
            {origin === "signup"
                ? <p className="text-sm text-gray-400 text-center ">Already have an Account ? <Link className="underline" href="/sign-in">Sign In</Link></p>
                : <p className="text-sm text-gray-400 text-center">New to Writely ? <Link className="underline" href="/sign-up">Sign Up</Link></p>
            }
        </div>
    )
}