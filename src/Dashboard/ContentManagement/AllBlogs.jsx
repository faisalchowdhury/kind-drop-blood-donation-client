import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import useAxiosBase from "../../Hooks/useAxiosBase";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Loading from "../../Components/Utilities/Loading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useUserRole from "../../Hooks/useUserRole";

export default function AllBlogs() {
  const axiosBase = useAxiosBase();
  const axiosSecure = useAxiosSecure();
  const {
    userRole: { role },
  } = useUserRole();
  // Pagination
  const [itemPerPage, setItemPerPage] = useState(5);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState("all-blogs");
  const pages = [...Array(Math.ceil(count / itemPerPage)).keys()];

  useEffect(() => {
    axiosBase
      .get(`/total-blogs?filter=${filter}`)
      .then((res) => setCount(res.data.count));
  }, []);

  const handleItemsPerPage = (e) => {
    setItemPerPage(e.target.value);
    setCurrentPage(0);
  };
  // Load blog data with pagination query
  const {
    data: blogs = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["blogs", currentPage, itemPerPage, filter],
    queryFn: () =>
      axiosBase
        .get(
          `/all-blogs?limit=${itemPerPage}&skip=${
            parseInt(itemPerPage) * parseInt(currentPage)
          }&filter=${filter}`
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

  // Handle Blog Status

  const makeItDraft = (id) => {
    Swal.fire({
      title: "Do you want to draft this blog",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        draftMutation.mutate(id);
      } else if (result.isDenied) {
      }
    });
  };

  const draftMutation = useMutation({
    mutationFn: (id) =>
      axiosSecure.patch("/make-blog-draft", { id }).then((res) => res.data),
    onSuccess: () => {
      refetch();
    },
  });

  const makeItPublish = (id) => {
    Swal.fire({
      title: "Do you want to Publish this blog",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        publishMutation.mutate(id);
      } else if (result.isDenied) {
      }
    });
  };

  const publishMutation = useMutation({
    mutationFn: (id) =>
      axiosSecure.patch("/make-blog-publish", { id }).then((res) => res.data),
    onSuccess: () => {
      refetch();
    },
  });
  const handleBlogFilter = (e) => {
    setFilter(e.target.value);
    setCurrentPage(0);
    refetch();
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="p-4 bg-white rounded shadow overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 text-primary">All Blogs</h2>
      <div className="border p-3 border-slate-300 rounded flex justify-end">
        <select
          defaultValue={filter}
          onChange={handleBlogFilter}
          className="p-2 border rounded"
          name=""
          id="">
          <option value="all-blogs">All Blogs</option>
          <option value="publish">Publish</option>
          <option value="draft">Draft</option>
        </select>
      </div>
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
            {role === "admin" && <th>Update Status</th>}
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
                    to={`/dashboard/content-management/blog-preview/${blog._id}`}
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

              {role === "admin" && (
                <td>
                  {blog.status === "publish" ? (
                    <button
                      onClick={() => makeItDraft(blog._id)}
                      className="btn btn-sm border-none bg-yellow-200 rounded">
                      Draft
                    </button>
                  ) : (
                    <button
                      onClick={() => makeItPublish(blog._id)}
                      className="btn btn-sm border-none bg-green-300 rounded">
                      Publish
                    </button>
                  )}
                </td>
              )}
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
