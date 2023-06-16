import Link from "next/link"
import React from 'react'
import type { PostType } from "@/app/page"

function Post({post}: {post:PostType}) {
  return (
          <Link href={`/blog/${post.id}`} legacyBehavior>
            <div className="w-fit mx-auto p-5 first:mt-6 mt-3 border border-slate-600 shadow-md hover:border-2 focus:rounded-lg duration-100" key={post.id}>
            <h1 className="text-xl font-medium">
              {post.title}
            </h1>
            <p className="">
              {post.description}
            </p>
            <div className="mt-3 flex justify-between items-center">
              <p className="text-xs text-slate-400">
              Uploaded at : {new Date(post.date).toLocaleString()}
              </p>
              <div>
              <Link className="mx-3" href={`/blog/edit/${post.id}`}>
                <button className="px-2 py-1 border border-slate-300 rounded-sm">
                  🖊️
                </button>
              </Link>
              <Link href={`/blog/delete/${post.id}`}>
                <button className="px-2 py-1 border border-slate-300 rounded-sm">
                  Delete
                </button>
              </Link>
              </div>
            </div>
          </div>
          </Link>
  )
}

export default Post
