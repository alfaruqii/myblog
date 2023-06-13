"use client"
import BackHome from '@/app/components/BackHome'
import { useRouter } from 'next/router'
import React, { useRef } from "react"

type Id = {
  params:{
    id:string
  }
}

const editPost = async ({id,title,description}:{id:string,title:string,description:string}) => {
   const data = await fetch(`http://localhost:3000/api/blog/${id}`,{
    method:"PUT",
    body:JSON.stringify({title,description}),
    headers:{
      "Content-Type": "application/json; charset=utf8"
    }}
  ).then((res) => res.json())
  return data
}

async function page({params:specificId}:Id) {
  const title = useRef<HTMLInputElement | null>(null)
  const description = useRef<HTMLTextAreaElement | null>(null)
  const {id} = specificId
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(id && title.current?.value && description.current?.value) {
      await editPost({id,title:title.current?.value,description:description.current?.value})
    }
  }
  return (
    <div>
      <div className='border p-4 mt-3 w-fit mx-auto'>
        <h1 className='font-bold text-3xl'>
          Edit Blog Page
        </h1>
        <BackHome/>
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

