import React from "react";
import useAxiosBase from "../Hooks/useAxiosBase";
import { useQuery } from "@tanstack/react-query";

export default function AllDonationRequests() {
  const axiosBase = useAxiosBase();

  const { data: requests = [] } = useQuery({
    queryKey: ["requests"],
    queryFn: () =>
      axiosBase.get("/all-donation-requests").then((res) => res.data),
  });

  console.log(requests);
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
                  <th className="bg-white">{id + 1}</th>
                  <td>{request.recipientName}</td>
                  <td>
                    District - {request.recipientDistrict} <br /> Upazila -{" "}
                    {request.recipientUpazila} <br />
                    Address Line - {request.addressLine}
                  </td>
                  <td>{request.donationDate}</td>
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
      </div>
    </>
  );
}
