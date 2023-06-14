"use client"
import BackHome from '@/app/components/BackHome'
import React, { useRef } from "react"
import toast, { Toaster } from 'react-hot-toast';

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
      "Content-Type": "application/json"
    }}
  ).then((res) => res.json())
  return data
}

async function page({params:specificId}:Id) {
  const title = useRef<HTMLInputElement | null>(null)
  const description = useRef<HTMLTextAreaElement | null>(null)
  const {id} = specificId
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
    if(id && title.current?.value && description.current?.value) {
      await editPost({id,title:title.current?.value,description:description.current?.value})
    }
  }
  return (
    <div>
      <Toaster/>
      <div className='border-2 border-slate-600 p-4 w-fit mx-auto mt-4 rounded-sm shadow-md'>
        <h1 className='font-bold text-3xl mb-1'>
          Edit Blog Page
        </h1>
        <BackHome/>
      </div>
      <form className="flex flex-col w-1/2 p-12 mx-auto" onSubmit={handleSubmit}>
        <label htmlFor="new-title-post">Add title</label>
        <input id="new-title-post" type="text" placeholder="Your title" className="text-black p-2 rounded-sm border border-gray-300" ref={title}/>
        <label htmlFor="new-description-post" className="mt-3">Add description</label>
        <textarea id="new-description-post" placeholder="Your description" className="text-black p-2 rounded-sm border border-gray-300" ref={description}/>
        <button onClick={notify} className="w-fit mt-2 p-2 border border-slate-700 rounded-sm shadow-md " type="submit">Submit</button>
      </form>
    </div>
  )
}

export default page

