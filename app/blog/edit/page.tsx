"use client"
import BackHome from '@/app/components/BackHome'
import React, { useRef } from "react"


function page({post}) {
  const title = useRef<HTMLInputElement | null>(null)
  const description = useRef<HTMLTextAreaElement | null>(null)
  return (
    <div>
      <div className='border p-4 mt-3 w-fit mx-auto'>
        <h1 className='font-bold text-3xl'>
          Edit Blog Page
        </h1>
        <BackHome/>
      </div>
      <form className="flex flex-col w-1/2 p-12 mx-auto">
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
