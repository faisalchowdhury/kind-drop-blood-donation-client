import React, { useEffect, useState } from "react";
import useAxiosBase from "../Hooks/useAxiosBase";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Components/Utilities/Loading";
import { Link } from "react-router";
import Swal from "sweetalert2";

export default function AllDonationRequests() {
  const axiosBase = useAxiosBase();
  const [count, setCount] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  // Pagination
  const pages = [...Array(Math.ceil(count / itemPerPage)).keys()];

  useEffect(() => {
    axiosBase
      .get("/total-donation-request-count")
      .then((res) => setCount(res.data.count));
  }, []);

  const handleTotalNumberOfItem = (e) => {
    setItemPerPage(e.target.value);
    setCurrentPage(0);
  };
  //   Load all donation request
  useEffect(() => {
    setLoading(true);
    axiosBase
      .get(
        `/all-donation-requests?limit=${itemPerPage}&skip=${
          parseInt(currentPage) * parseInt(itemPerPage)
        }`
      )
      .then((res) => {
        setRequests(res.data);
        setLoading(false);
      });
  }, [currentPage, itemPerPage, status]);

  // Load District

  const { data: districts = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: () =>
      axios.get(`/src/Data/district.json`).then((res) => res?.data[2]?.data),
  });

  // handle status

  const handleDonationStatus = (id, newStatus) => {
    const dataToUpdate = {
      id,
      newStatus,
    };
    statusMutation.mutate(dataToUpdate);
  };

  const statusMutation = useMutation({
    mutationFn: (dataToUpdate) =>
      axiosBase
        .patch("/inprogress-to-status-update", dataToUpdate)
        .then((res) => res.data),
    onSuccess: (res) => {
      setStatus(res);
    },
  });

  // Delete donation request
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosBase.delete(`/delete-donation-request/${id}`);
      return res.data;
    },
    onSuccess: (res) => {
      Swal.fire("Donation request deleted successfully");
      // Refetch your requests to update the UI
      setStatus((prev) => prev + 1);
    },
    onError: (error) => {
      Swal.fire("Something went wrong");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <div className="bg-slate-50 p-4 shadow rounded">
        <h2 className="text-xl font-semibold mb-4 text-primary">
          All Donation Requests
        </h2>
        <div className="overflow-x-auto">
          <table className="table table-md table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <th className="bg-white">No.</th>
                <td>Recipient Name</td>
                <td>Location</td>
                <td>Date</td>
                <td>Time</td>
                <td>Blood Group</td>
                <td>Status</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, id) => (
                <tr key={request._id} className="hover:bg-slate-200">
                  <th className="bg-white">
                    {id + 1 + currentPage * itemPerPage}
                  </th>
                  <td>{request.recipientName}</td>
                  <td>
                    District -{" "}
                    {districts.length > 0 &&
                      districts.find(
                        (district) => district.id == request.recipientDistrict
                      )?.name}
                    <br /> Upazila - {request.recipientUpazila} <br />
                    Address Line - {request.addressLine}
                  </td>
                  <td>{new Date(request.donationDate).toLocaleDateString()}</td>
                  <td>{request.donationTime}</td>

                  <td>
                    <span className="bg-red-600 text-white p-2 rounded-lg">
                      {request.bloodGroup}
                    </span>
                  </td>
                  <td>
                    <span className=" bg-amber-400">
                      {request.status[0].toUpperCase() +
                        request.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="grid grid-cols-2 gap-1 items-center justify-center">
                      {request.status === "inprogress" && (
                        <>
                          <button
                            onClick={() =>
                              handleDonationStatus(request._id, "done")
                            }
                            className="btn btn-success btn-sm bg-primary text-white border-none">
                            Done
                          </button>
                          <button
                            onClick={() =>
                              handleDonationStatus(request._id, "cancel")
                            }
                            className="btn btn-error btn-sm bg-accent text-white border-none">
                            Cancel
                          </button>
                        </>
                      )}
                      {request.status === "pending" && (
                        <>
                          <Link
                            to={`/dashboard/edit-donation-request/${request._id}`}
                            className="btn btn-info btn-sm border">
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(request._id)}
                            className="btn btn-error btn-sm border">
                            Delete
                          </button>
                        </>
                      )}
                      <Link
                        to={`/dashboard/view-donation-request-details/${request._id}`}
                        className="btn btn-neutral btn-sm border col-span-2">
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex gap-1 justify-end mt-5">
          {pages.map((page) => (
            <button
              className={`btn btn-xs border ${
                currentPage === page ? "bg-primary text-white" : ""
              }`}
              onClick={() => setCurrentPage(page)}
              key={page}>
              {page + 1}
            </button>
          ))}

          <select
            className="text-xs border"
            onChange={handleTotalNumberOfItem}
            defaultValue={itemPerPage}>
            <option>3</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>
      </div>
    </>
  );
}
