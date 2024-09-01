import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <main className=" min-h-screen  grid place-content-center  p-24">
      <div className="border px-40 py-16 rounded-xl text-center">
        <h1 className="font-black text-2xl mb-6 ">Welcome to WordBlog</h1>
        <Link href={"/blogs"}>
          <Button variant="outline">Explore Blogs</Button>
        </Link>
      </div>
    </main>
  )
}
