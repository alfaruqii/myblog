"use client"
import BackHome from "@/app/components/BackHome"
import React, { useRef } from "react"
import toast, { Toaster } from 'react-hot-toast';

const addNewPost = async ({title,description}:{title:string,description:string}) => {
   const data = await fetch("http://localhost:3000/api/blog",{
    method:"POST",
    body:JSON.stringify({title,description}),
    headers:{
      "Content-Type": "application/json; charset=utf8"
    }}
  ).then((res) => res.json())
  return data
}

function page() {
  const title = useRef<HTMLInputElement | null>(null)
  const description = useRef<HTMLTextAreaElement | null>(null)
  const notify = () => toast(
    'Succes ✅', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  })
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(title.current?.value && description.current?.value) {
      await addNewPost({title:title.current?.value,description:description.current?.value})
    }
  }
  return (
    <div>
      <Toaster/>
      <div className="border-2 border-white p-4 w-fit mx-auto mt-4 rounded-sm">
        <h1 className="font-bold text-3xl">
          Adding new post 📤
        </h1>
        <BackHome/>
      </div>
      <form className="flex flex-col w-1/2 p-12 mx-auto" onSubmit={handleSubmit}>
        <label htmlFor="new-title-post">Add title</label>
        <input id="new-title-post" type="text" placeholder="Your title" className="text-black p-2 rounded-sm" ref={title}/>
        <label htmlFor="new-description-post" className="mt-3">Add description</label>
        <textarea id="new-description-post" placeholder="Your description" className="text-black p-2 rounded-sm" ref={description}/>
        <button onClick={notify} className="w-fit p-2 border border-white rounded mt-2" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default page
