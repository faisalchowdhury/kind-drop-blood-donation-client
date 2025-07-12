import React, { useState } from "react";
import RichTextEditor from "./Component/RichTextEditor";

export default function AddBlog() {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleCreatePost = () => {
    // Add post creation logic here
    console.log({ title, thumbnail });
  };

  return (
    <div className="p-4 bg-white rounded shadow  mx-auto">
      <h2 className="text-xl font-semibold text-primary mb-4">Add Blog</h2>
      <form action="">
        <input
          type="text"
          placeholder="Title of the blog"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
          className="border p-2 rounded w-full mb-4"
        />
        <RichTextEditor setContent={setContent} content={content} />
        <button
          onClick={handleCreatePost}
          className="btn btn-primary text-white mt-4 w-full">
          Create Post
        </button>
      </form>
    </div>
  );
}
