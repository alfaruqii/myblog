"use client"
import React, { useRef } from 'react'
import BackHome from "@/app/components/BackHome"
import toast, { Toaster } from 'react-hot-toast';

type Id = {
  params:{
    id:string
  }
}

type Params = {
  id:string
}

const deletePost = async ({id}:Params) => {
   const data = await fetch(`http://localhost:3000/api/blog/${id}`,{
    method:"DELETE",
    headers:{
      "Content-Type": "application/json"
    }}
  ).then((res) => res.json())
  return data
}

function page({params:specificId}: Id) {
  const verification = useRef<HTMLInputElement | null>(null)
  const {id} = specificId
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(verification.current?.value.toLowerCase() === "yes" && id) {
      await deletePost({id})
    }
  }
  const notify = () => {
    if(verification.current?.value.toLowerCase() === "yes" && id) {
      return toast(
        'Delete was succes ✅', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }else {
      return toast(
        'Failed ❌', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }
  return (
    <div>
      <Toaster/>
      <div className="border-2 border-slate-600 p-4 w-fit mx-auto mt-4 rounded-sm shadow-md">
        <h1 className="font-bold text-3xl mb-1">
          Delete Posts ❌
        </h1>
        <BackHome/>
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col w-1/2 p-12 mx-auto'>
        <div className='p-4 w-fit'>
          <p className='font-bold'>
            Make sure that you sure want to delete it because it deletes permanently
          </p>
        </div>
        <div>
          <input className='p-2 w-full border border-gray-300' type="text" ref={verification} placeholder='type "Yes" if you sure want to delete it'/>
          <button className='w-fit mt-2 p-2 border border-slate-700 rounded-sm shadow-md ' onClick={notify} type='submit'>Delete</button>
        </div>
      </form>
    </div>
  )
}

export default page
