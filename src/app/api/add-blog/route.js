import connectToDb from "@/database"
import Blog from "@/model/blog"
import Joi from "joi"
import { NextResponse } from "next/server"

const AddNewBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required,
})

export default async function POST(req) {
  try {
    await connectToDb()

    // This is the data filled by user in create form
    const extractBlogData = await req.json()
    const { title, description } = extractBlogData

    const { error } = AddNewBlog.validate({
      title,
      description,
    })

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      })
    }

    const newlyCreatedBlogItem = await Blog.create(extractBlogData)
    if (newlyCreatedBlogItem) {
      return NextResponse.json({
        seccess: true,
        message: "Blog added Successfully",
      })
    } else {
      return NextResponse.json({
        success: false,
        message: "Something Went wrong ! Plaease try again",
      })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      success: false,
      message: "Something Went wrong ! Plaease try again",
    })
  }
}
