import Link from "next/link"

export type Post = {
  id: string,
  title: string,
  description: string,
  date: string
}

const fetchBlogs = async () => {
  const posts = await fetch("http://localhost:3000/api/blog",{
    next:{
      revalidate:10
    }
  })
  const res = await posts.json()
  return res.posts
}

export default async function Home() {
  const posts = await fetchBlogs()
  return (
    <main className="transition-all">
      <div className="border-2 border-slate-600 p-4 w-fit mx-auto mt-4 rounded-sm shadow-md">
        <p className="font-bold text-2xl">
          Welcome to my blog 📝
        </p>
      </div>
      <div className="border border-slate-600 p-2 w-fit mx-auto mt-3 rounded-sm shadow-md">
        <button>
          <Link href="/blog/new">
            Add new blog post
          </Link>
        </button>
      </div>
      <div>
        {posts?.map((post:Post) => {
          return <div className="w-fit mx-auto p-5 first:mt-6 mt-3 border border-slate-600 shadow-md hover:border-2 focus:rounded-lg duration-100" key={post.id}>
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
        })}
      </div>
    </main>
  )
}
