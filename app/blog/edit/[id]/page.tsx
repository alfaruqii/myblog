import BackHome from "@/app/components/BackHome/BackHome";
import Edit from "@/app/components/EditPost/Edit";
import { Toaster } from "react-hot-toast";

export type Id = {
  params: {
    id: string;
  };
};

export async function editPost({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) {
  const data = await fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, description }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return data;
}

async function page({ params: specificId }: Id) {
  return (
    <div>
      <Toaster />
      <div className="border-2 border-slate-600 p-4 w-fit mx-auto mt-4 rounded-sm shadow-md">
        <h1 className="font-bold text-3xl mb-1">Edit Blog Page</h1>
        <BackHome />
      </div>
      <Edit params={specificId} />
    </div>
  );
}

export default page;
