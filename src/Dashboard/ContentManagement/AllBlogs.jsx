import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import useAxiosBase from "../../Hooks/useAxiosBase";
import { Link } from "react-router";
import Swal from "sweetalert2";

export default function AllBlogs() {
  const axiosBase = useAxiosBase();
  // Pagination
  const [itemPerPage, setItemPerPage] = useState(5);
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
  // Load blog data with pagination query
  const { data: blogs = [], refetch } = useQuery({
    queryKey: ["blogs", currentPage, itemPerPage],
    queryFn: () =>
      axiosBase
        .get(
          `/all-blogs?limit=${itemPerPage}&skip=${
            parseInt(itemPerPage) * parseInt(currentPage)
          }`
        )
        .then((res) => res.data),
  });

  // Delete Blog
  const handleDeleteBlog = (id) => {
    Swal.fire({
      title: "Do you want to delete this blog",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      } else if (result.isDenied) {
      }
    });
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosBase.delete(`/delete-blog/${id}`),
    onSuccess: () => {
      refetch();
    },
  });
  return (
    <div className="p-4 bg-white rounded shadow overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 text-primary">All Blogs</h2>
      <table className="table table-md">
        <thead>
          <tr>
            <th>No</th>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Author</th>
            <th>Email</th>
            <th>Created On</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, id) => (
            <tr key={blog._id} className="hover:bg-slate-200">
              <td>{id + 1 + currentPage * itemPerPage}</td>
              <td>
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-16 h-16 rounded object-cover"
                />
              </td>
              <td className="font-medium">{blog.title}</td>
              <td>{blog.author}</td>
              <td>{blog.author_email}</td>
              <td>{new Date(blog.creation_date).toLocaleDateString()}</td>
              <td>
                <span
                  className={`badge ${
                    blog.status === "published"
                      ? "badge-success"
                      : "badge-warning"
                  }`}>
                  {blog.status}
                </span>
              </td>
              <td>
                <div className="flex gap-2">
                  <Link
                    to={`/blog-details/${blog._id}`}
                    className="btn border-none rounded bg-primary text-white  btn-xs btn-info">
                    <FaEye />
                  </Link>
                  <Link
                    to={`/dashboard/content-management/edit-blog/${blog._id}`}
                    className="btn  border-none rounded bg-green-600 text-white btn-xs btn-success">
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDeleteBlog(blog._id)}
                    className="btn border-none rounded bg-accent text-white btn-xs btn-error">
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-1 justify-end">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`btn border btn-xs ${
              currentPage == page ? "bg-primary text-white" : ""
            }`}>
            {page}
          </button>
        ))}
        <select
          onChange={handleItemsPerPage}
          className="text-sm border"
          name=""
          id="">
          <option>5</option>
          <option>20</option>
          <option>50</option>
        </select>
      </div>
    </div>
  );
}
