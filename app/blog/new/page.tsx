"use client"
import React, { useRef } from "react"

const addNewPost = async ({title,description}:{title:string,description:string}) => {
  const posts = await fetch("https://localhost:3000/api/blog/")
}

function page() {
  const title = useRef<HTMLInputElement | null>(null)
  const description = useRef<HTMLTextAreaElement | null>(null)
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addNewPost({title,description})
  }
  return (
    <div>
      <div className="border-2 border-white p-4 w-fit mx-auto mt-4 rounded-sm">
        <h1 className="font-bold text-3xl">
          Adding new post 📤
        </h1>
      </div>
      <form className="flex flex-col w-1/2 p-12 mx-auto" onSubmit={handleSubmit}>
        <label htmlFor="new-title-post">Add title</label>
        <input id="new-title-post" type="text" placeholder="Your title" className="text-black p-2 rounded-sm" ref={title}/>
        <label htmlFor="new-description-post" className="mt-3">Add description</label>
        <textarea id="new-description-post" placeholder="Your description" className="text-black p-2 rounded-sm" ref={description}/>
        <button className="w-fit p-2 border border-white rounded mt-2" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default page
