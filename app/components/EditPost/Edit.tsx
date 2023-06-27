"use client";
import React, { useRef, useState } from "react";
import { editPost } from "@/app/blog/edit/[id]/page";
import type { Id } from "@/app/blog/edit/[id]/page";
import toast from "react-hot-toast";

function Edit({ params: specificId }: Id) {
  const [alreadyEdited, setAlreadyEdited] = useState(false);
  const title = useRef<HTMLInputElement | null>(null);
  const description = useRef<HTMLTextAreaElement | null>(null);
  const { id } = specificId;
  const notify = () => {
    if (title.current?.value && description.current?.value && alreadyEdited) {
      return toast("Already Edited ✅", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (title.current?.value && description.current?.value) {
      return toast("Edit was Succes ✅", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      return toast("Failed, your input cannot be empty ❌", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      id &&
      title.current?.value &&
      description.current?.value &&
      !alreadyEdited
    ) {
      setAlreadyEdited(true);
      await editPost({
        id,
        title: title.current?.value,
        description: description.current?.value,
      });
    }
  };
  return (
    <form className="flex flex-col w-1/2 p-12 mx-auto" onSubmit={handleSubmit}>
      <label htmlFor="new-title-post">Add title</label>
      <input
        id="new-title-post"
        type="text"
        placeholder="Your title"
        className="text-black p-2 rounded-sm border border-gray-300"
        ref={title}
      />
      <label htmlFor="new-description-post" className="mt-3">
        Add description
      </label>
      <textarea
        id="new-description-post"
        placeholder="Your description"
        className="text-black p-2 rounded-sm border border-gray-300"
        ref={description}
      />
      <button
        onClick={notify}
        className="w-fit mt-2 p-2 border border-slate-700 rounded-sm shadow-md "
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}

export default Edit;
