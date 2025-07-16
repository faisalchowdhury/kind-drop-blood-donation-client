import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useAxiosBase from "../../Hooks/useAxiosBase";
import Loading from "../../Components/Utilities/Loading";
import useAuth from "../../Hooks/useAuth";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Fallback from "../../Components/Fallback/Fallback";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const RecentDonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const axiosBase = useAxiosBase();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  //   Load all donation request
  useEffect(() => {
    setLoading(true);
    axiosBase
      .get(`/my-recent-donation-requests?email=${user?.email}`)
      .then((res) => {
        setRequests(res.data);
        setLoading(false);
      });
  }, [status]);

  // Load District

  const { data: districts = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: () =>
      axios.get(`/Data/district.json`).then((res) => res?.data[2]?.data),
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
      axiosSecure
        .patch("/inprogress-to-status-update", dataToUpdate)
        .then((res) => res.data),
    onSuccess: (res) => {
      setStatus(res);
    },
  });

  // Delete donation request
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/delete-donation-request/${id}`);
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
    <div>
      <div className="overflow-x-auto space-y-10">
        <h2 className="my-5 text-2xl">My Recent Donation Requests</h2>

        {requests.length === 0 ? (
          <Fallback message={"You haven't requested any donation"}></Fallback>
        ) : (
          <div className="space-y-10">
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
                  <td>Donor Information</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {requests.map((request, id) => (
                  <tr key={request._id} className="hover:bg-slate-200">
                    <th className="bg-white">{id + 1}</th>
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
                    <td>
                      {new Date(request.donationDate).toLocaleDateString()}
                    </td>
                    <td>{request.donationTime}</td>
                    <td>
                      <span className="bg-red-600 text-white p-2 rounded-lg">
                        {request.bloodGroup}
                      </span>
                    </td>
                    <td>
                      <span className=" ">
                        {request.status[0].toUpperCase() +
                          request.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      {request.status === "inprogress" && (
                        <>
                          <div className="bg-slate-200 p-2 border rounded border-dashed w-[150px]">
                            <p>{request.donorName}</p>
                            <p>{request.donorEmail}</p>
                          </div>
                        </>
                      )}
                      {request.status === "pending" && (
                        <>
                          <div className="bg-slate-200 p-2 border rounded border-dashed w-[150px]">
                            <p className="bg-orange-400 p-1 text-white">
                              Not yet response by anyone
                            </p>
                          </div>
                        </>
                      )}
                      {request.status === "cancel" && (
                        <div className="bg-slate-200 p-2 border rounded border-dashed w-[150px]">
                          <p className="text-white bg-red-600">
                            Request canceled
                          </p>
                        </div>
                      )}
                      {request.status === "done" && (
                        <>
                          <div className="bg-slate-200 p-2 border rounded border-dashed w-[150px]">
                            <p>{request.donorName}</p>
                            <p>{request.donorEmail}</p>
                            <p className="text-white bg-green-600">
                              Donation Success
                            </p>
                          </div>
                        </>
                      )}
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
            <div className="flex justify-center">
              {" "}
              <Link
                to={"/dashboard/my-donation-requests"}
                className="btn border-none bg-primary text-white rounded hover:bg-accent">
                View my all donation request
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentDonationRequests;
