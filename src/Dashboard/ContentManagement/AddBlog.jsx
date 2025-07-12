import React, { useState } from "react";
import RichTextEditor from "./Component/RichTextEditor";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosBase from "../../Hooks/useAxiosBase";
import Swal from "sweetalert2";

export default function AddBlog() {
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const axiosBase = useAxiosBase();

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  //   Upload to cloudinary

  const uploadToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "unsigned_preset");

    const imageInfo = await axios.post(
      `https://api.cloudinary.com/v1_1/dtvrjavzf/image/upload`,
      formData
    );

    return imageInfo.data;
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    let image_url = "";
    const title = e.target.title.value;
    if (thumbnail) {
      image_url = await uploadToCloudinary(thumbnail);
    }
    const dataToUpload = {
      title,
      thumbnail: image_url.secure_url,
      description: content,
      author: user?.displayName,
      author_email: user?.email,
      creation_date: new Date().toISOString(),
      status: "draft",
    };

    mutation.mutate(dataToUpload);
  };

  const mutation = useMutation({
    mutationFn: (data) => axiosBase.post("/add-blog", data),
    onSuccess: (res) => {
      if (res.data.acknowledged) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your blog has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        mutation.reset();
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <div className="p-4 bg-white rounded shadow  mx-auto">
      <h2 className="text-xl font-semibold text-primary mb-4">Add Blog</h2>
      <form onSubmit={handleCreatePost}>
        <input
          type="text"
          placeholder="Title of the blog"
          name="title"
          className="border p-2 rounded w-full mb-4"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
          className="border p-2 rounded w-full mb-4"
          required
        />
        <RichTextEditor setContent={setContent} content={content} />
        <button
          type="submit"
          className="btn btn-primary text-white mt-4 w-full">
          Create Post
        </button>
      </form>
    </div>
  );
}
