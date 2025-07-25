import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosBase from "../../hooks/useAxiosBase";
import Loading from "../../components/Utilities/Loading";
import Fallback from "../../components/Fallback/Fallback";

export default function AllBlogs() {
  const axiosBase = useAxiosBase();
  const [itemPerPage, setItemPerPage] = useState(8);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [...Array(Math.ceil(count / itemPerPage)).keys()];

  useEffect(() => {
    axiosBase.get("/total-blogs").then((res) => setCount(res.data.count));
  }, []);

  const handleItemsPerPage = (e) => {
    setItemPerPage(e.target.value);
    setCurrentPage(0);
  };
  const {
    data: blogs = [],

    isLoading,
  } = useQuery({
    queryKey: ["blogs", currentPage, itemPerPage],
    queryFn: () =>
      axiosBase
        .get(
          `/all-blogs?status=publish&limit=${itemPerPage}&skip=${
            parseInt(itemPerPage) * parseInt(currentPage)
          }`
        )
        .then((res) => res.data),
  });

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="py-10 px-2">
      <h2 className="text-2xl font-bold  mb-8 text-primary">Read Blogs</h2>
      {blogs.length === 0 ? (
        <Fallback message={"No blog found"}></Fallback>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 flex flex-col">
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-40 object-cover rounded-t"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2 flex-1 line-clamp-3">
                  {blog.description?.replace(/<[^>]+>/g, "").slice(0, 80)}...
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  Author: {blog.author || "Unknown"} | Publish at:{" "}
                  {new Date(blog.creation_date).toLocaleDateString()}
                </p>
                <div>
                  <Link
                    to={`/blog-details/${blog._id}`}
                    className="btn btn-accent rounded-full mt-auto hover:bg-primary text-white">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-1 justify-end my-5">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`btn border btn-xs ${
              currentPage == page ? "bg-primary text-white" : ""
            }`}>
            {page + 1}
          </button>
        ))}
        <select
          onChange={handleItemsPerPage}
          className="text-sm border"
          name=""
          id="">
          <option>8</option>
          <option>20</option>
          <option>50</option>
        </select>
      </div>
    </div>
  );
}
