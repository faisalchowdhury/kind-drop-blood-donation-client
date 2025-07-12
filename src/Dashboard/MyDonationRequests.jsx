import React, { useEffect, useState } from "react";
import useAxiosBase from "../Hooks/useAxiosBase";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../Hooks/useAuth";

export default function MyDonationRequests() {
  const axiosBase = useAxiosBase();
  const [count, setCount] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);
  const [requests, setRequests] = useState([]);
  const { user } = useAuth();
  // Pagination
  const pages = [...Array(Math.ceil(count / itemPerPage)).keys()];

  useEffect(() => {
    axiosBase
      .get(`/my-donation-request-count?email=${user?.email}`)
      .then((res) => setCount(res.data.count));
  }, []);

  console.log(count);

  const handleTotalNumberOfItem = (e) => {
    setItemPerPage(e.target.value);
    setCurrentPage(0);
  };
  //   Load all donation request
  useEffect(() => {
    axiosBase
      .get(
        `/my-donation-requests?email=${user?.email}&limit=${itemPerPage}&skip=${
          parseInt(currentPage) * parseInt(itemPerPage)
        }`
      )
      .then((res) => setRequests(res.data));
  }, [currentPage, itemPerPage]);

  // Load District

  const { data: districts = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: () =>
      axios.get(`/src/Data/district.json`).then((res) => res?.data[2]?.data),
  });

  return (
    <>
      <div className="bg-slate-50 p-4 shadow rounded">
        <h2 className="text-xl font-semibold mb-4 text-primary">
          All Donation Requests
        </h2>
        <div className="overflow-x-auto">
          <table className="table table-sm table-pin-rows table-pin-cols">
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

                  <td>{request.bloodGroup}</td>
                  <td>{request.status}</td>
                  <td className="grid grid-cols-2 gap-1 items-center justify-center">
                    <button className="btn btn-success btn-xs">Done</button>
                    <button className="btn btn-error btn-xs">Cancel</button>
                    <button className="btn btn-info btn-xs">Edit</button>
                    <button className="btn btn-error btn-xs">Delete</button>
                    <button className="btn btn-neutral btn-xs col-span-2">
                      View
                    </button>
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
