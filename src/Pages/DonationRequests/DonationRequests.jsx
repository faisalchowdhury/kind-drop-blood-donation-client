import React, { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosBase from "../../Hooks/useAxiosBase";
import { Link } from "react-router";
import Fallback from "../../Components/Fallback/Fallback";

export default function DonationRequests() {
  const axiosBase = useAxiosBase();
  const [count, setCount] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [requests, setRequests] = useState([]);

  const pages = [...Array(Math.ceil(count / itemPerPage)).keys()];

  // Get total count
  useEffect(() => {
    axiosBase
      .get("/total-donation-request-count")
      .then((res) => setCount(res.data.count));
  }, []);

  // Load paginated requests
  useEffect(() => {
    axiosBase
      .get(
        `/all-donation-requests-front?status=pending&limit=${itemPerPage}&skip=${
          currentPage * itemPerPage
        }`
      )
      .then((res) => setRequests(res.data));
  }, [currentPage, itemPerPage]);

  // Load districts
  const { data: districts = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: () =>
      axios.get(`/Data/district.json`).then((res) => res?.data[2]?.data),
  });

  return (
    <div className="p-4  mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-primary">
        Active Blood Donation Requests
      </h2>

      {requests.length === 0 ? (
        <Fallback message={"No Donation Request Found"}></Fallback>
      ) : (
        <div>
          {" "}
          <div className="grid md:grid-cols-3 gap-5">
            {requests.map((request, index) => (
              <div
                key={request._id}
                className="card bg-white shadow hover:shadow-lg transition p-4 border border-slate-200 rounded-lg flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">
                    Blood Group:{" "}
                    <span className=" text-red-600 mb-2">
                      {request.bloodGroup}{" "}
                    </span>
                  </h3>
                  <p className="  text-gray-600">
                    <span className="font-medium">Location:</span> District -{" "}
                    {districts.find((d) => d.id == request.recipientDistrict)
                      ?.name || "Loading..."}{" "}
                    | Upazila - {request.recipientUpazila}
                  </p>
                  <p className="  text-gray-600">
                    <span className="font-medium">Address:</span>{" "}
                    {request.addressLine}
                  </p>
                  <p className="  text-gray-600">
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(request.donationDate).toLocaleDateString()} |{" "}
                    <span className="font-medium">Time:</span>{" "}
                    {request.donationTime}
                  </p>
                  <p className="  text-gray-600">
                    <span className="font-medium">Recipient Name:</span>{" "}
                    {request.recipientName}
                  </p>
                  <p className="  text-gray-600">
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(request.donationDate).toLocaleDateString()}
                  </p>
                  <p className="  text-gray-600">
                    <span className="font-medium">Time:</span>{" "}
                    {request.donationTime}
                  </p>
                </div>
                <Link
                  to={`/donation-request-details/${request._id}`}
                  className="btn btn-primary rounded-lg text-white mt-3 w-full">
                  View Details
                </Link>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex flex-wrap justify-end gap-2 mt-6">
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`btn btn-sm border ${
                  currentPage === page ? "bg-primary text-white" : ""
                }`}>
                {page + 1}
              </button>
            ))}
            <select
              onChange={(e) => {
                setItemPerPage(e.target.value);
                setCurrentPage(0);
              }}
              defaultValue={itemPerPage}
              className="border ml-2">
              <option>10</option>
              <option>15</option>
              <option>50</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
