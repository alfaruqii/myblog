import BackHome from "@/app/components/BackHome/BackHome"
import NewPost from "@/app/components/NewPost/NewPost";
import { Toaster } from 'react-hot-toast';

export async function addNewPost ({title,description}:{title:string,description:string}) {
   const data = await fetch("http://localhost:3000/api/blog",{
    method:"POST",
    body:JSON.stringify({title,description}),
    headers:{
      "Content-Type": "application/json"
    }}
  ).then((res) => res.json())
  return data
}

function page() {
  return (
    <div>
      <Toaster/>
      <div className="border-2 border-slate-600 p-4 w-fit mx-auto mt-4 rounded-sm shadow-md">
        <h1 className="font-bold text-3xl mb-1">
          Adding new post 📤
        </h1>
        <BackHome/>
      </div>
      <NewPost/>
    </div>
  )
}

export default page
