import BlogOverview from "@/components/blog-overview"

async function fetchListOfBlogs() {
  try {
    const response = await fetch("http://localhost:3000/api/get-blogs", {
      method: "GET",
      cache: "no-store",
    })
    const result = await response.json()

    return result?.data
  } catch (error) {
    throw new Error(error)
  }
}

export default async function Blogs() {
  const blogList = await fetchListOfBlogs()

  console.log(blogList)

  return <BlogOverview blogList={blogList} />
}
