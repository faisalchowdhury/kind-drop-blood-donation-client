import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosBase from "../../Hooks/useAxiosBase";
import Loading from "../../Components/Utilities/Loading";
import axios from "axios";

export default function DonationRequestDetails() {
  const { id } = useParams();
  const axiosBase = useAxiosBase();

  const { data: request = {}, isLoading } = useQuery({
    queryKey: ["donationRequest", id],
    queryFn: async () => {
      const res = await axiosBase.get(`/get-donation-request/${id}`);
      return res.data;
    },
  });

  const { data: districts = [], isLoading: isDistrictLoading } = useQuery({
    queryKey: ["districts"],
    queryFn: () =>
      axios.get(`/src/Data/district.json`).then((res) => res?.data[2]?.data),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="card shadow-xl p-6 bg-white rounded-lg my-5 border border-dashed space-y-5">
        <h2 className="text-2xl font-bold text-primary mb-10">
          Blood Group:{" "}
          <span className="text-red-600">{request.bloodGroup}</span>
        </h2>

        <div className="space-y-3  text-gray-900 text-semibold text-xl grid sm:grid-cols-2">
          <p>
            <span>Requested By:</span> {request.name}
          </p>
          <p>
            <span>Email:</span> {request.email}
          </p>
          <p>
            <span>Recipient Name:</span> {request.recipientName}
          </p>
          <p>
            <span>District:</span>{" "}
            {isDistrictLoading
              ? "Loading..."
              : districts.find((d) => d.id == request.recipientDistrict)
                  ?.name || "Unknown"}
          </p>
          <p>
            <span>Upazila:</span> {request.recipientUpazila}
          </p>
          <p>
            <span>Hospital Name:</span> {request.hospitalName}
          </p>
          <p>
            <span>Full Address:</span> {request.addressLine}
          </p>
          <p>
            <span>Blood Group:</span> {request.bloodGroup}
          </p>
          <p>
            <span>Donation Date:</span>{" "}
            {request.donationDate
              ? new Date(request.donationDate).toLocaleDateString()
              : "N/A"}
          </p>
          <p>
            <span>Donation Time:</span> {request.donationTime}
          </p>
          <p>
            <span>Request Message:</span> {request.requestMessage}
          </p>
          <p>
            <span>Status:</span> {request.status}
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => window.history.back()}
            className="btn btn-primary text-white">
            Go Back
          </button>
          <button className="btn btn-accent text-white">
            Donate {request.bloodGroup} Blood
          </button>
        </div>
      </div>
    </div>
  );
}
