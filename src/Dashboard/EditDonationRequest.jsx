import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosBase from "../hooks/useAxiosBase";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Utilities/Loading";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function EditDonationRequest() {
  const { id } = useParams();
  const axiosBase = useAxiosBase();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [upazilaByDistrict, setUpazilaByDistrict] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const districtCheck = watch("recipientDistrict");

  // Load districts
  const { data: districts = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const { data } = await axios.get("/Data/district.json");
      return data?.[2]?.data;
    },
  });

  // Load upazilas
  const { data: upazilas = [] } = useQuery({
    queryKey: ["upazilas"],
    queryFn: async () => {
      const { data } = await axios.get("/Data/upazila.json");
      return data?.[2]?.data;
    },
  });

  // Load the existing donation data
  const { data: request, isLoading } = useQuery({
    queryKey: ["donationRequest", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/get-donation-request/${id}`);
      return data;
    },
    onSuccess: (data) => {
      // Prefill the form on load
      reset({
        name: data.name,
        email: data.email,
        recipientName: data.recipientName,
        recipientDistrict: data.recipientDistrict,
        recipientUpazila: data.recipientUpazila,
        hospitalName: data.hospitalName,
        addressLine: data.addressLine,
        bloodGroup: data.bloodGroup,
        donationDate: data.donationDate ? data.donationDate.slice(0, 10) : "",
        donationTime: data.donationTime,
        requestMessage: data.requestMessage,
      });
    },
  });

  // Filter upazilas based on selected district
  useEffect(() => {
    const selectedDistrict =
      watch("recipientDistrict") || request?.recipientDistrict;
    if (selectedDistrict && upazilas.length > 0) {
      const filtered = upazilas.filter(
        (upazila) => upazila?.district_id == selectedDistrict
      );
      setUpazilaByDistrict(filtered);
    }
  }, [request?.recipientDistrict, upazilas, watch("recipientDistrict")]);

  const mutation = useMutation({
    mutationFn: (data) => {
      return axiosSecure.patch(`/update-donation-request/${id}`, data);
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Donation request updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed to update donation request",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });

  const onSubmit = (data) => {
    data.donationDate = new Date(data.donationDate).toISOString();
    mutation.mutate(data);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold text-primary mb-4">
        Edit Donation Request
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            defaultValue={request?.name || ""}
            type="text"
            disabled
            {...register("name")}
            className="border p-2 rounded w-full bg-gray-100"
          />
        </div>
        <div>
          <input
            defaultValue={request?.email || ""}
            type="email"
            disabled
            {...register("email")}
            className="border p-2 rounded w-full bg-gray-100"
          />
        </div>
        <div>
          <input
            defaultValue={request?.recipientName || ""}
            type="text"
            placeholder="Recipient Name"
            {...register("recipientName", {
              required: "Recipient Name is required",
            })}
            className="border p-2 rounded w-full"
          />
          {errors.recipientName && (
            <p className="text-red-500 text-sm">
              {errors.recipientName.message}
            </p>
          )}
        </div>
        <div>
          <select
            defaultValue={request?.recipientDistrict || ""}
            {...register("recipientDistrict", {
              required: "Recipient District is required",
            })}
            className="border p-2 rounded w-full">
            {districts.map((district) => (
              <option key={district?.id} value={district?.id}>
                {district?.name}
              </option>
            ))}
          </select>
          {errors.recipientDistrict && (
            <p className="text-red-500 text-sm">
              {errors.recipientDistrict.message}
            </p>
          )}
        </div>
        <div>
          <select
            defaultValue={request.recipientUpazila}
            {...register("recipientUpazila", {
              required: "Recipient Upazila is required",
            })}
            className="border p-2 rounded w-full">
            {upazilaByDistrict.map((upazila) => (
              <option key={upazila?.id} value={upazila?.name}>
                {upazila?.name}
              </option>
            ))}
          </select>
          {errors.recipientUpazila && (
            <p className="text-red-500 text-sm">
              {errors.recipientUpazila.message}
            </p>
          )}
        </div>
        <div>
          <input
            defaultValue={request?.hospitalName || ""}
            type="text"
            placeholder="Hospital Name"
            {...register("hospitalName", {
              required: "Hospital Name is required",
            })}
            className="border p-2 rounded w-full"
          />
          {errors.hospitalName && (
            <p className="text-red-500 text-sm">
              {errors.hospitalName.message}
            </p>
          )}
        </div>
        <div>
          <input
            defaultValue={request?.addressLine || ""}
            type="text"
            placeholder="Full Address Line"
            {...register("addressLine", {
              required: "Full Address Line is required",
            })}
            className="border p-2 rounded w-full"
          />
          {errors.addressLine && (
            <p className="text-red-500 text-sm">{errors.addressLine.message}</p>
          )}
        </div>
        <div>
          <select
            defaultValue={request?.bloodGroup || ""}
            {...register("bloodGroup", { required: "Blood Group is required" })}
            className="border p-2 rounded w-full">
            <option value="">Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          {errors.bloodGroup && (
            <p className="text-red-500 text-sm">{errors.bloodGroup.message}</p>
          )}
        </div>
        <div>
          <input
            defaultValue={
              request?.donationDate ? request.donationDate.slice(0, 10) : ""
            }
            type="date"
            {...register("donationDate", {
              required: "Donation Date is required",
            })}
            className="border p-2 rounded w-full"
          />
          {errors.donationDate && (
            <p className="text-red-500 text-sm">
              {errors.donationDate.message}
            </p>
          )}
        </div>
        <div>
          <input
            defaultValue={request?.donationTime || ""}
            type="time"
            {...register("donationTime", {
              required: "Donation Time is required",
            })}
            className="border p-2 rounded w-full"
          />
          {errors.donationTime && (
            <p className="text-red-500 text-sm">
              {errors.donationTime.message}
            </p>
          )}
        </div>
        <div className="md:col-span-2">
          <textarea
            defaultValue={request?.requestMessage || ""}
            placeholder="Request Message"
            {...register("requestMessage", {
              required: "Request Message is required",
            })}
            className="border p-2 rounded w-full"
            rows="4"></textarea>
          {errors.requestMessage && (
            <p className="text-red-500 text-sm">
              {errors.requestMessage.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-primary text-white p-2 rounded md:col-span-2">
          Update Request
        </button>
      </form>
    </div>
  );
}
