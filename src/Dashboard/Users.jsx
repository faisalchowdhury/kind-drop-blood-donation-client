import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxiosBase from "../hooks/useAxiosBase";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import Loading from "../components/Utilities/Loading";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const Users = () => {
  const axiosBase = useAxiosBase();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  // Pagination
  const [itemPerPage, setItemPerPage] = useState(5);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState("all-users");
  const pages = [...Array(Math.ceil(count / itemPerPage)).keys()];
  useEffect(() => {
    axiosBase
      .get(`/total-users?filter=${filter}`)
      .then((res) => setCount(res.data.count));
  }, [filter]);

  const handleItemsPerPage = (e) => {
    setItemPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  // Pagination

  // load data
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", currentPage, itemPerPage, filter],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `/users?email=${user?.email}&limit=${itemPerPage}&skip=${
          parseInt(itemPerPage) * parseInt(currentPage)
        }&filter=${filter}`
      );
      return result.data;
    },
  });

  // Block user
  const handleBlockUser = (id) => {
    Swal.fire({
      title: `Do you want make this user Block this user?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        blockUserMutation.mutate(id);
      } else if (result.isDenied) {
      }
    });
  };
  const blockUserMutation = useMutation({
    mutationFn: (id) =>
      axiosBase.patch(`/block-user-status/${id}`).then((res) => res.data),
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `User status change to block`,
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    },
  });

  // Active user
  const handleActiveUser = (id) => {
    Swal.fire({
      title: `Do you want make this user Active this user?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        activeUserMutation.mutate(id);
      } else if (result.isDenied) {
      }
    });
  };
  const activeUserMutation = useMutation({
    mutationFn: (id) =>
      axiosBase.patch(`/active-user-status/${id}`).then((res) => res.data),
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `User status changed to Active`,
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    },
  });

  // Handle user Role

  const handleUserRole = (id, e) => {
    Swal.fire({
      title: `Do you want make this user ${e.target.value}`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const info = {
          id,
          role: e.target.value,
        };
        roleMutation.mutate(info);
      } else if (result.isDenied) {
      }
    });
  };

  const roleMutation = useMutation({
    mutationFn: (info) => axiosBase.patch("/manage-role", info),
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `User role have been changed`,
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    },
  });

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: `Do you want delete this user ?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteMutaion.mutate(id);
      } else if (result.isDenied) {
      }
    });
  };

  const deleteMutaion = useMutation({
    mutationFn: (id) =>
      axiosBase.delete(`/delete-user/${id}`).then((res) => res.data),
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `User deleted successfully`,
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    },
  });

  const handleUserFilter = (e) => {
    setFilter(e.target.value);
    setCurrentPage(0);
    refetch();
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <div className="overflow-x-auto overflow-y-hidden space-y-5">
        <div className="border p-3 border-slate-300 rounded flex justify-end">
          <select
            defaultValue={filter}
            onChange={handleUserFilter}
            className="p-2 border rounded"
            name=""
            id="">
            <option value="all-users">All Users</option>
            <option value="active-users">Active Users</option>
          </select>
        </div>
        <table className="table border border-slate-300 ">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>

              <th>Creation Date</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
              <th>Manage Role</th>
            </tr>
          </thead>
          <tbody>
            {/* row  */}

            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={user.image_url}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                        <div className="text-sm opacity-50">{user.upazila}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>

                  <td>{new Date(user.creation_date).toLocaleDateString()}</td>
                  <td>{user.role.toUpperCase()}</td>
                  <td>{user.status}</td>
                  <td>
                    <div className="flex gap-2 items-center">
                      {user.status === "active" ? (
                        <button
                          onClick={() => handleBlockUser(user._id)}
                          title="Click to block user"
                          className="btn rounded-lg bg-red-600 text-white">
                          Block
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActiveUser(user._id)}
                          title="Click to active user"
                          className="btn rounded-lg bg-green-600 text-white">
                          Active
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="btn rounded-lg bg-primary text-white">
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                  <td>
                    <select
                      defaultValue={user.role}
                      onChange={(e) => handleUserRole(user._id, e)}
                      className="border border-slate-400 p-2 outline-0 rounded shadow">
                      <option disabled={user.role === "donor"} value="donor">
                        Donor
                      </option>
                      <option
                        disabled={user.role === "volunteer"}
                        value="volunteer">
                        Volunteer
                      </option>
                      <option disabled={user.role === "admin"} value="admin">
                        Admin
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex gap-1 justify-end mr-5">
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
    </>
  );
};

export default Users;
