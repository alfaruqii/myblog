const fetchBlogs = async () => {
  const posts = await fetch("localhost:3000/blog/api",{
    next:{
      revalidate:10
    }
  })
  const res = await posts.json()
  return res.posts
}

export default function Home() {
  return (
    <div>
      Hello World
    </div>
  )
}
