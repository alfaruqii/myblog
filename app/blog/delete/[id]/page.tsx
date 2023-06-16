import BackHome from "@/app/components/BackHome/BackHome"
import Delete from "@/app/components/Delete/Delete";
import  { Toaster } from 'react-hot-toast';

export type Id = {
  params:{
    id:string
  }
}

type Params = {
  id:string
}

export async function deletePost ({id}:Params) {
   const data = await fetch(`http://localhost:3000/api/blog/${id}`,{
    method:"DELETE",
    headers:{
      "Content-Type": "application/json"
    }}
  ).then((res) => res.json())
  return data
}

function page({params:specificId}: Id) {
  return (
    <div>
      <Toaster/>
      <div className="border-2 border-slate-600 p-4 w-fit mx-auto mt-4 rounded-sm shadow-md">
        <h1 className="font-bold text-3xl mb-1">
          Delete Posts ❌
        </h1>
        <BackHome/>
      </div>
      <Delete params={specificId}/>
    </div>
  )
}

export default page
