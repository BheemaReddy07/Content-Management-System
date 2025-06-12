import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Layers, Pencil, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full ">
      <section className="flex justify-center h-[50vh] sm:h-[70vh] w-full   ">
        <div  className="flex flex-col gap-4 justify-center items-center  text-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl ">
              Manage Your Content with Ease
            </h1>
            <p className="text-gray-400 max-w-[700px] mx-auto mt-2">
              Streamline Your content workflow, Publish with confidence
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/sign-in" className="bg-gray-200 hover:bg-gray-300 transition-all duration-200 delay-100 text-black px-4 py-1 rounded" >
              Try it out!
            </Link>
            <Button variant="outline">Try it out!</Button>
          </div>
        </div>
      </section>

      <section className="min-h-screen w-full  sm:min-h-[50vh] bg-gray-600/10 flex justify-center items-center px-4 ">
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3  ">
          <span className=" flex  flex-col items-center gap-2 transition-transform duration-200 hover:scale-105 cursor-pointer ">
            <Icons.BlogCustomIcon className="w-16 h-16" />
            <h3 className="text-xl font-bold text-gray-100">Intutive Editor</h3>
            <p className="text-gray-400 w-[70%] text-center">Create and Edit content with user friendly interface</p>
          </span>
          <span className=" flex  flex-col items-center gap-2 transition-transform duration-200 hover:scale-105 cursor-pointer">
            <Layers size={50} />
            <h3 className="text-xl font-bold text-gray-100">Flexible Tools</h3>
            <p className="text-gray-400  w-[70%] text-center">Create and Edit content with user friendly interface</p>
          </span>
          <span className=" flex  flex-col items-center gap-2 transition-transform duration-200 hover:scale-105 cursor-pointer">
            <Zap size={50} />
            <h3 className="text-xl font-bold text-gray-100">Blazing Fast</h3>
            <p className="text-gray-400   w-[70%] text-center">Create and Edit content with user friendly interface</p>
          </span>

        </div>
      </section>
      <section className="h-[60vh] min-h-[50vh] w-full flex flex-col justify-center items-start gap-2">
        <div className="max-w-[50%] mx-auto">
          <h4 className="font-bold text-2xl">Ready to transform Your Content Journey?</h4>
          <p className="text-sm text-gray-400 mt-2">Join Thousands of content creators like you who  chose CMS</p>
          <div className="flex gap-2 mt-2">
            <input className="bg-zinc-800 focus:outline-none rounded px-2 py-[7px] text-sm text-gray-400" type="text" placeholder="Enter your email" />
            <Button variant="outline">
              submit
            </Button>
          </div>

        </div>
      </section>
    </main>
  );
}
