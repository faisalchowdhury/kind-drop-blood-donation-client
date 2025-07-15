import React, { useState } from "react";
import { useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosBase from "../../Hooks/useAxiosBase";
import Loading from "../../Components/Utilities/Loading";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

export default function DonationRequestDetails() {
  const { id } = useParams();
  const axiosBase = useAxiosBase();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: request = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donationRequest", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/get-donation-request/${id}`);
      return res.data;
    },
  });

  const { data: districts = [], isLoading: isDistrictLoading } = useQuery({
    queryKey: ["districts"],
    queryFn: () =>
      axios.get(`/src/Data/district.json`).then((res) => res?.data[2]?.data),
  });

  const handleDonateBlood = (e) => {
    e.preventDefault();
    const form = e.target;
    const donorName = form.donorName.value;
    const donorEmail = form.donorEmail.value;

    // You can call your API here to confirm donation
    const donorInfo = { donorName, donorEmail, donationRequestId: request._id };
    console.log(donorInfo);

    donorMutation.mutate(donorInfo);
    setIsModalOpen(false);
  };
  const donorMutation = useMutation({
    mutationFn: (donorInfo) =>
      axiosBase
        .patch(`/donate/${donorInfo.donationRequestId}`, donorInfo) // ✅ send donorInfo as body
        .then((res) => res.data),
    onSuccess: (res) => {
      console.log(res);
      Swal.fire({
        icon: "success",
        title: "Donation Confirmed",
        text: "Thank you for donating blood!",
        timer: 2000,
        showConfirmButton: false,
      });
      refetch();
    },
    onError: (err) => {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: err?.response?.data?.message || "Please try again",
      });
    },
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

        <div className="space-y-3 text-gray-900 font-medium text-xl grid sm:grid-cols-2">
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

        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => window.history.back()}
            className="btn btn-primary text-white">
            Go Back
          </button>
          {request.status === "pending" && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-accent text-white">
              Donate {request.bloodGroup} Blood
            </button>
          )}
        </div>
      </div>

      {/* DaisyUI Modal */}
      {isModalOpen && (
        <dialog id="donate_modal" className="modal modal-open">
          <div className="modal-box bg-white rounded-lg">
            <h3 className="font-bold text-lg mb-4">
              Donate Blood Confirmation
            </h3>
            <form onSubmit={handleDonateBlood} className="space-y-4">
              <label htmlFor="">Donator name</label>
              <input
                type="text"
                name="donorName"
                value={user?.displayName || ""}
                readOnly
                className="input input-bordered w-full border"
              />
              <label htmlFor="">Donator eamil</label>
              <input
                type="email"
                name="donorEmail"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full border"
              />

              <div className="modal-action flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-neutral">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary text-white">
                  Confirm Donation
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
}
