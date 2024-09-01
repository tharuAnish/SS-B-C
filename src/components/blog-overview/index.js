"use client"

import { useState } from "react"
import AddNewBlog from "../add-new-blog"

const initialBlogFormData = {
  title: "",
  description: "",
}

export default function BlogOverview() {
  const [openBlogDialog, setOpenBlogDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [blogFormData, setBlogFormData] = useState(initialBlogFormData)

  console.log(blogFormData)

  async function handleSaveBlogData() {
    try {
      setLoading(true)
      const apiResponse = await fetch("/api/add-blog", {
        method: "POST",
        body: JSON.stringify(blogFormData),
      })
      const result = await apiResponse.json()
      if (result?.success) {
        setBlogFormData(initialBlogFormData)
        setOpenBlogDialog(false)
        setLoading(false)
      }
      console.log(result)
    } catch (error) {
      console.log(error)
      setLoading(false)
      setBlogFormData(initialBlogFormData)
    }
  }

  return (
    <main className=" min-h-screen justify-center items-center flex flex-col gap-10  p-24">
      <AddNewBlog
        loading={loading}
        setLoading={setLoading}
        openBlogDialog={openBlogDialog}
        setOpenBlogDialog={setOpenBlogDialog}
        blogFormData={blogFormData}
        setBlogFormData={setBlogFormData}
        handleSaveBlogData={handleSaveBlogData}
      />
    </main>
  )
}
