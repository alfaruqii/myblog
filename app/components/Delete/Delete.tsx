"use client"
import React, { useRef, useState } from "react"
import { deletePost } from '@/app/blog/delete/[id]/page'
import type { Id } from '@/app/blog/delete/[id]/page'
import toast from 'react-hot-toast';

function Delete({params:specificId}: Id) {
  const [alreadyDeleted,setAlreadyDeleted] = useState(false)
  const verification = useRef<HTMLInputElement | null>(null)
  const {id} = specificId
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(verification.current?.value.toLowerCase() === "yes" && id) {
      setAlreadyDeleted(true)
      await deletePost({id})
    }
  }
  const notify = () => {
    if(verification.current?.value.toLowerCase() === "yes" && id && alreadyDeleted) {
      return toast(
        'Already deleted ✅', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }else if(verification.current?.value.toLowerCase() === "yes" && id){
      return toast(
        'Delete was Succes ✅', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }else{
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
  )
}

export default Delete
