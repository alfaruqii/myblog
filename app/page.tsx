import Link from "next/link";
import Post from "./components/Post/Post";

export type PostType = {
  id: string;
  title: string;
  description: string;
  date: string;
};

const fetchBlogs = async () => {
  const posts = await fetch("http://localhost:3000/api/blog", {
    next: {
      revalidate: 5,
    },
  });
  const res = await posts.json();
  return res.posts;
};

export default async function Home() {
  const posts = await fetchBlogs();
  return (
    <main className="transition-all">
      <div className="border-2 border-slate-600 p-4 w-fit mx-auto mt-4 rounded-sm shadow-md">
        <p className="font-bold text-2xl">Welcome to my blog 📝</p>
      </div>
      <div className="border border-slate-600 p-2 w-fit mx-auto mt-3 rounded-sm shadow-md">
        <button>
          <Link href="/blog/new">Add new blog post</Link>
        </button>
      </div>
      <div>
        {posts?.map((post: PostType) => {
          return <Post post={post} />;
        })}
      </div>
    </main>
  );
}
