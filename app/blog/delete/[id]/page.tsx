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
  verification:string,
  id:string
}

const deletePost = async ({verification,id}:Params) => {
   const data = await fetch(`http://localhost:3000/api/blog/${id}`,{
    method:"DELETE",
    headers:{
      "Content-Type": "application/json"
    }}
  ).then((res) => res.json())
  return data
}

async function page({params:specificId}: Id) {
  const verification = useRef<HTMLInputElement | null>(null)
  const {id} = specificId
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(verification.current.value.toLowerCase() === "yes" && id) {
      await deletePost({verification:verification.current.value,id})
    }
  }
  const notify = () => {
    if(verification.current?.value.toLowerCase() === "yes" && id) {
      return toast(
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
          Adding new post 📤
        </h1>
        <BackHome/>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='p-2'>
          <p>
            Make sure that you sure want to delete it because it deletes permanently
          </p>
        </div>
        <input type="text" ref={verification} placeholder='type "Yes" if you sure want to delete it'/>
        <button onClick={notify} type='submit'>Delete</button>
      </form>
    </div>
  )
}

export default page
