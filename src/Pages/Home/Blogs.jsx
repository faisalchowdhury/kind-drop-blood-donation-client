import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosBase from "../../Hooks/useAxiosBase";
import { Link } from "react-router";
import Fallback from "../../Components/Fallback/Fallback";

const Blogs = () => {
  const axiosBase = useAxiosBase();
  const {
    data: blogs = [],

    isLoading,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => axiosBase.get(`/recent-blogs`).then((res) => res.data),
  });
  return (
    <>
      <div className="py-10">
        <h2 className="text-2xl font-bold  mb-8 text-primary">Rect blogs</h2>
        {blogs.length === 0 ? (
          <Fallback message={"No blog found"}></Fallback>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

                  <div className="my-3">
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
      </div>
    </>
  );
};

export default Blogs;
