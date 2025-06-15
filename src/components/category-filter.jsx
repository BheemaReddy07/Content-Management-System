"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react";

export default function CategoryFilter() {
    const Router = useRouter();
    const searchParams = useSearchParams();
    const [category, setCategory] = useState(searchParams.get('cat') || "")
     
    const handleSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString)
        params.set('cat', category)
        Router.push(`posts?${params.toString()}`)
    }
    return (
        <form onSubmit={handleSubmit} className="flex gap-3">
            <Input placeholder="Filter by category" value={category} onChange={e=>setCategory(e.target.value)} className="w-[300px]" type="text" />
            <Button type="submit">Filter</Button>
        </form>
    )
}