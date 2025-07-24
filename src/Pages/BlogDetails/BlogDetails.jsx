import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { FaUser } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import useAxiosBase from "../../hooks/useAxiosBase";

export default function BlogDetails() {
  const { id } = useParams();
  const axiosBase = useAxiosBase();

  const { data: blog = {} } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => axiosBase.get(`/get-blog/${id}`).then((res) => res.data),
  });

  return (
    <div className="max-w-5xl mx-auto p-5 my-10 shadow-xl rounded-lg">
      {/* Thumbnail */}
      <div className="w-full h-[300px] rounded-lg overflow-hidden shadow mb-6">
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Author & Date */}
      <div className="flex flex-wrap gap-4 text-gray-500 mb-6 text-sm items-center">
        <div className="flex items-center gap-2">
          <FaUser /> {blog.author || "anonymous"}
        </div>
        <div className="flex items-center gap-2">
          <MdDateRange />{" "}
          {blog.creation_date &&
            new Date(blog.creation_date).toLocaleDateString()}
        </div>
      </div>
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-3">{blog.title}</h1>

      {/* Description */}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.description }}></div>
    </div>
  );
}
