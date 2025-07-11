import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FaEdit, FaSave } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import useAxiosBase from "../Hooks/useAxiosBase";
import axios from "axios";

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const axiosBase = useAxiosBase();

  // Fetch user data (replace with your actual user fetching logic)
  const { data: userData = [], refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const profileData = await axiosBase.get(`/profile?email=${user.email}`);
      return profileData.data;
    },
  });
  // Get the district name by district_id

  const { data } = useQuery({
    queryKey: ["districts"],
    queryFn: () =>
      axios.get(`/src/Data/district.json`).then((res) => res?.data[2]?.data),
  });

  if (data) {
    const districtName = data.find((dis) => dis.id == userData.district_id);
  }
  console.log(districtName);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: userData,
  });

  // Update user data mutation
  const mutation = useMutation({
    mutationFn: (updatedData) =>
      axiosBase.put("/profile-update?email", updatedData),
    onSuccess: () => {
      setIsEditing(false);
      refetch();
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  //   // Sync form with fetched user data
  //   if (userData) {
  //     reset(userData);
  //   }

  return (
    <>
      <div className="max-w-full mx-auto  p-6 bg-white rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-primary">My Profile</h2>
          {isEditing ? (
            <button
              onClick={handleSubmit(onSubmit)}
              className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-3 py-1 rounded">
              <FaSave /> Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-3 py-1 rounded">
              <FaEdit /> Edit
            </button>
          )}
        </div>

        <form className="grid grid-cols-1 gap-4">
          <div className="relative w-32 h-32 rounded-full overflow-hidden ">
            {userData.image_url ? (
              <img
                src={userData.image_url}
                alt="Avatar Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-400 text-sm">
                No Image
              </div>
            )}
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                {...register("avatar")}
                onChange={""}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-700">Name</label>
            <input
              {...register("name", { required: true })}
              disabled={!isEditing}
              type="text"
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-accent"
              defaultValue={userData?.name}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700">Email</label>
            <input
              {...register("email")}
              disabled={true}
              type="email"
              className="border border-gray-300 rounded px-3 py-2 w-full bg-gray-100"
              defaultValue={userData?.email}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm text-gray-700">
                District
              </label>
              <input
                {...register("district")}
                disabled={!isEditing}
                type="text"
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-accent"
                defaultValue={userData?.district_id}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700">
                Upazila
              </label>
              <input
                {...register("upazila")}
                disabled={!isEditing}
                type="text"
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-accent"
                defaultValue={userData?.upazila}
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-700">
              Blood Group
            </label>
            <select
              disabled={!isEditing}
              defaultValue={userData.blood_group}
              {...register("blood_group", { required: true })}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent w-full">
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
        </form>
      </div>
    </>
  );
}
