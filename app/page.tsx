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
    <main>
      <div className="border-2 border-white p-4 w-fit mx-auto mt-4 rounded-sm">
        <p className="font-bold text-2xl">
          Welcome to my blog 📝
        </p>
      </div>
      <div className="border border-white p-2 w-fit mx-auto mt-3 rounded-sm">
        <button>
          <Link href="/blog/new">
            Add new blog post
          </Link>
        </button>
      </div>
      <div>
        {posts?.map((post:Post) => {
          return <div className="w-fit mx-auto p-3  first:mt-6 mt-3 border" key={post.id}>
            <h1 className="text-xl font-medium">
              Title : {post.title}
            </h1>
            <p className="">
              Description : {post.description}
            </p>
            <p className="mt-3 text-xs text-slate-400">
              Uploaded at : {new Date(post.date).toLocaleString()}
            </p>
          </div>
        })}
      </div>
    </main>
  )
}
