import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosBase from "../Hooks/useAxiosBase";

export default function CreateDonationRequest() {
  const { user } = useAuth();
  const [upazilaByDistrict, setUpazilaByDistrict] = useState([]);
  const axiosBase = useAxiosBase();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const districtCheck = watch("recipientDistrict");
  // Load District data
  const { data: districts = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const districtData = await axios.get("/src/Data/district.json");
      return districtData?.data[2]?.data;
    },
  });
  // Load Upazilas
  const { data: upazilas = [] } = useQuery({
    queryKey: ["upazilas"],
    queryFn: async () => {
      const districtData = await axios.get("/src/Data/upazila.json");
      return districtData?.data[2]?.data;
    },
  });

  // Set upazilas by district
  useEffect(() => {
    if (districtCheck) {
      const getUpazilas = upazilas.filter(
        (upazila) => upazila?.district_id == districtCheck
      );
      setUpazilaByDistrict(getUpazilas);
    }
  }, [districtCheck]);

  const onSubmit = (data) => {
    data.status = "pending";
    data.donationDate = new Date(data.donationDate).toISOString();
    mutation.mutate(data);
  };

  const mutation = useMutation({
    mutationFn: (data) => {
      return axiosBase.post("/create-donation-request", data);
    },
    onSuccess: (res) => {
      console.log(res);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Donation request created successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
    },
    onError: () => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Donation request not created",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  return (
    <div className=" mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold text-primary mb-4">
        Create Donation Request
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            disabled
            defaultValue={user?.displayName || ""}
            {...register("name")}
            className="border p-2 rounded w-full bg-gray-100"
          />
        </div>
        <div>
          <input
            type="email"
            disabled
            defaultValue={user?.email || ""}
            {...register("email")}
            className="border p-2 rounded w-full bg-gray-100"
          />
        </div>
        <div>
          <input
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
            {...register("recipientDistrict", {
              required: "Recipient District is required",
            })}
            className="border p-2 rounded w-full">
            <option value="">Select District</option>
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
            {...register("recipientUpazila", {
              required: "Recipient Upazila is required",
            })}
            className="border p-2 rounded w-full">
            <option value="">Select Upazila</option>
            {upazilaByDistrict &&
              upazilaByDistrict.map((upazila) => (
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
            {...register("bloodGroup", { required: "Blood Group is required" })}
            className="border p-2 rounded w-full">
            <option value="">Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          {errors.bloodGroup && (
            <p className="text-red-500 text-sm">{errors.bloodGroup.message}</p>
          )}
        </div>
        <div>
          <input
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
          Request
        </button>
      </form>
    </div>
  );
}
