import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FaEdit, FaSave } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import useAxiosBase from "../Hooks/useAxiosBase";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const axiosBase = useAxiosBase();
  const axiosSecure = useAxiosSecure();
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentDistrict, setCurrentDistrict] = useState([]);

  // Fetch user data (replace with your actual user fetching logic)
  const { data: userData = [], refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const profileData = await axiosBase.get(`/profile?email=${user.email}`);
      return profileData.data;
    },
  });
  // Use form hook
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: userData,
  });
  const districtCheck = watch("district");
  // Get the district name by district_id

  const { data = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: () =>
      axios.get(`/Data/district.json`).then((res) => res?.data[2]?.data),
  });

  const districtName = data.find((dis) => dis.id == userData.district_id);

  // Load Upazila
  const { data: upazilaData = [], isLoading } = useQuery({
    queryKey: ["upazila"],
    queryFn: async () => {
      const upazilaData = await axios.get("/Data/upazila.json");
      return upazilaData?.data[2]?.data;
    },
  });

  // Load Upazila by District
  useEffect(() => {
    if (upazilaData.length > 0) {
      const upazilaByDistrict = upazilaData.filter(
        (upazila) => upazila?.district_id == districtCheck
      );
      setCurrentDistrict(upazilaByDistrict);
    }
  }, [districtCheck]);

  //   Image Upload
  const handleFileUpload = (e) => {
    const formData = e.target.files[0];
    setSelectedFile(formData);
  };

  //   Upload To cloudinary

  const handleUploadToCloudinary = async (imageFile) => {
    const formData = new FormData();

    formData.append("file", imageFile);
    formData.append("upload_preset", "unsigned_preset");
    const imageInfo = await axios.post(
      `https://api.cloudinary.com/v1_1/dtvrjavzf/image/upload`,
      formData
    );

    return imageInfo?.data;
  };

  const submitUpdateProfile = async (data) => {
    let image_url = userData.image_url;
    console.log(selectedFile);
    if (selectedFile) {
      const image_res = await handleUploadToCloudinary(selectedFile);
      image_url = image_res.secure_url;
    }

    const dataToUpdate = {
      name: data.name,
      district_id: data.district,
      upazila: data.upazila,
      blood_group: data.blood_group,
      image_url,
    };
    mutation.mutate(dataToUpdate);
  };

  const mutation = useMutation({
    mutationFn: (updatedData) => {
      return axiosSecure.patch(
        `/update-user?email=${userData.email}`,
        updatedData
      );
    },
    onSuccess: () => {
      setIsEditing(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your profile updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    },
    onError: () => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  return (
    <>
      <div className="max-w-full mx-auto  p-6 bg-white rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-primary">My Profile</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-3 py-1 rounded">
              <FaEdit /> Edit
            </button>
          )}
        </div>

        <form
          onSubmit={handleSubmit(submitUpdateProfile)}
          className="grid grid-cols-1 gap-4">
          <div
            className={`relative w-32 h-32 rounded-full overflow-hidden group ${
              !isEditing ? "hover:cursor-pointer" : ""
            }`}>
            {userData.image_url ? (
              <>
                <img
                  src={userData.image_url}
                  alt="Avatar Preview"
                  className={`object-cover w-full h-full transform transition-transform duration-300 ${
                    isEditing ? "group-hover:scale-110" : ""
                  }`}
                />
                {isEditing && (
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <FaEdit className="text-white text-3xl" />
                  </div>
                )}
              </>
            ) : (
              <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-400 text-sm">
                No Image
              </div>
            )}

            {isEditing && (
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                onChange={handleFileUpload}
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

              {userData.district_id && (
                <select
                  defaultValue={userData?.district_id}
                  {...register("district")}
                  disabled={!isEditing}
                  className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-accent">
                  {data.map((dis) => (
                    <option key={dis.id} value={dis.id}>
                      {dis.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700">
                Upazila
              </label>
              {userData?.upazila && (
                <select
                  defaultValue={userData?.upazila}
                  disabled={!isEditing}
                  {...register("upazila")}
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent w-full">
                  {!isEditing ? (
                    <option value={userData?.upazila}>
                      {userData?.upazila}
                    </option>
                  ) : (
                    currentDistrict &&
                    currentDistrict.map((upazila) => (
                      <option key={upazila.id} value={upazila.name}>
                        {upazila.name}
                      </option>
                    ))
                  )}
                </select>
              )}
            </div>
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-700">
              Blood Group
            </label>
            {userData.blood_group && (
              <select
                disabled={!isEditing}
                defaultValue={userData?.blood_group}
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
            )}
          </div>

          {isEditing && (
            <button
              type="submit"
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-3 py-1 rounded">
              <FaSave /> Save
            </button>
          )}
        </form>
      </div>
    </>
  );
}
