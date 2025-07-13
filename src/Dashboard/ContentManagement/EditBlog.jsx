import React, { useEffect, useState } from "react";
import RichTextEditor from "./Component/RichTextEditor";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosBase from "../../Hooks/useAxiosBase";
import Swal from "sweetalert2";
import { useParams } from "react-router";

export default function EditBlog() {
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");

  const { user } = useAuth();
  const axiosBase = useAxiosBase();

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  // Load Blog data

  const { id } = useParams();

  const { data: blogData = {} } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => axiosBase.get(`/get-blog/${id}`).then((res) => res.data),
  });

  useEffect(() => {
    setContent(blogData.description);
  }, [blogData]);
  console.log(blogData);

  //   Upload to cloudinary

  const uploadToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "unsigned_preset");

    const imageInfo = await axios.post(
      `https://api.cloudinary.com/v1_1/dtvrjavzf/image/upload`,
      formData
    );

    return imageInfo.data.secure_url;
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    let image_url = "";
    const title = e.target.title.value;
    if (thumbnail) {
      image_url = await uploadToCloudinary(thumbnail);
    } else {
      image_url = blogData.thumbnail;
    }
    const dataToUpdate = {
      title,
      thumbnail: image_url,
      description: content,
      last_modified: new Date().toISOString(),
    };

    mutation.mutate(dataToUpdate);
  };

  const mutation = useMutation({
    mutationFn: (data) => axiosBase.patch(`/update-blog/${id}`, data),
    onSuccess: (res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Updated blog content",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <div className="p-4 bg-white rounded shadow  mx-auto">
      <h2 className="text-xl font-semibold text-primary mb-4">
        Edit blog - {blogData.title}
      </h2>
      <form onSubmit={handleUpdatePost}>
        <input
          type="text"
          placeholder="Title of the blog"
          name="title"
          className="border p-2 rounded w-full mb-4"
          required
          defaultValue={blogData.title}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
          className="border p-2 rounded w-full mb-4"
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
