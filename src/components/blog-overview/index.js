"use client"

import { useState, useEffect } from "react"
import AddNewBlog from "../add-new-blog"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { Label } from "../ui/label"

const initialBlogFormData = {
  title: "",
  description: "",
}

export default function BlogOverview({ blogList }) {
  const [openBlogDialog, setOpenBlogDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [blogFormData, setBlogFormData] = useState(initialBlogFormData)

  const router = useRouter()

  useEffect(() => {
    router.refresh()
  }, [])

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
        router.refresh()
      }
      console.log(result)
    } catch (error) {
      console.log(error)
      setLoading(false)
      setBlogFormData(initialBlogFormData)
    }
  }

  async function handleDeleteBlogByID(getCurrentID) {
    try {
      const apiResponse = await fetch(`/api/delete-blog?id=${getCurrentID}`, {
        method: "DELETE",
      })
      const result = await apiResponse.json()

      if (result?.success) router.refresh()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <main className=" min-h-screen  flex flex-col gap-10  p-24">
      <AddNewBlog
        loading={loading}
        setLoading={setLoading}
        openBlogDialog={openBlogDialog}
        setOpenBlogDialog={setOpenBlogDialog}
        blogFormData={blogFormData}
        setBlogFormData={setBlogFormData}
        handleSaveBlogData={handleSaveBlogData}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {blogList && blogList.length > 0 ? (
          blogList.map((blogItem) => (
            <Card className="pt-5 bg-stone-50">
              <CardContent className="flex flex-col justify-between gap-5 h-full">
                <div>
                  <CardTitle className="mb-4">{blogItem?.title}</CardTitle>
                  <CardDescription>{blogItem?.description}</CardDescription>
                </div>
                <div className=" flex gap-5  items-center">
                  <Button onClick={() => handleEdit(blogItem)}>Edit</Button>
                  <Button onClick={() => handleDeleteBlogByID(blogItem._id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Label className="text-3xl font-extrabold">
            No Blog found! Please add one
          </Label>
        )}
      </div>
    </main>
  )
}
