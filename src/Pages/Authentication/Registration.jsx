import { useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import Lottie from "lottie-react";
import registerAnimation from "../../assets/Lottie/registration.json";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosBase from "../../Hooks/useAxiosBase";
import useNotification from "../../Hooks/useNotification";
export default function Registration() {
  const { createAccount, updateUserProfile, user } = useAuth();
  const [currentDistrict, setCurrentDistrict] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosBase = useAxiosBase();
  const navigate = useNavigate();
  const notification = useNotification();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const districtCheck = watch("district");
  // Load District
  const { data } = useQuery({
    queryKey: ["district"],
    queryFn: () => axios.get("/src/Data/district.json"),
  });
  // Load Upazila
  const { data: upazilaData } = useQuery({
    queryKey: ["upazila"],
    queryFn: () => axios.get("/src/Data/upazila.json"),
  });

  const districts = data?.data[2]?.data;
  const upazilas = upazilaData?.data[2]?.data;
  // Load Upazila by District
  useEffect(() => {
    if (districtCheck && upazilas) {
      const upazilaByDistrict = upazilas.filter(
        (upazila) => upazila?.district_id == districtCheck
      );

      setCurrentDistrict(upazilaByDistrict);
    }
  }, [districtCheck]);

  // image File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  // handle Cloudinary upload
  const handleUploadToCloudinary = async (imageFile) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "unsigned_preset");
    const imageInfo = await axios.post(
      `https://api.cloudinary.com/v1_1/dtvrjavzf/image/upload`,
      formData
    );

    return imageInfo.data;
  };

  // handle registration submit
  const submitRegistration = async (data) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(data.password)) {
      notification.error(
        "Password must be at least 6 characters long, include one uppercase and one lowercase letter."
      );
      return;
    }

    if (data.password !== data.confirm_password) {
      notification.error("Password and confirm password must be the same.");
      return;
    }

    const { name, email, password } = data;
    const imageInfo = await handleUploadToCloudinary(selectedFile);
    const userInformationDb = {
      name,
      email,
      district_id: data.district,
      upazila: data.upazila,
      image_url: imageInfo.secure_url,
      blood_group: data.blood_group,
      status: "active",
      role: "donor",
      creation_date: new Date().toISOString(),
    };

    createAccount(email, password)
      .then((result) => {
        if (result?.user) {
          updateUserProfile(name, imageInfo.secure_url)
            .then(() => {
              registerMutation.mutate(userInformationDb);
            })
            .catch((err) => {
              console.log(
                "Something went wrong while updating user profile",
                err
              );
            });
        }
      })
      .catch((err) => {
        console.log(err);
        notification.error("Registration failed. Please try again.");
      });
  };

  const registerMutation = useMutation({
    mutationFn: (userInformationDb) =>
      axiosBase.post("/add-user", userInformationDb),
    onSuccess: () => {
      setLoading(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User have been created successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard");
    },
  });

  if (user) {
    return <Navigate to={"/dashboard"}></Navigate>;
  }
  return (
    <div className="min-h-screen flex flex-col gap-5 md:flex-row">
      {/* Left Side: Registration Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center  bg-white">
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-6 text-primary">
            Create Your KindDrop Account
          </h2>
          <form
            onSubmit={handleSubmit(submitRegistration)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Name"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent w-full"
              />
              {errors?.name && errors?.name.type === "required" ? (
                <p className="text-accent">Name field is require </p>
              ) : null}
            </div>

            <div>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Email"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent w-full"
              />
              {errors?.email && errors?.email.type === "required" ? (
                <p className="text-accent">Enter a valid email </p>
              ) : null}
            </div>
            <div>
              <input
                {...register("image", { required: true })}
                type="file"
                onChange={handleFileUpload}
                placeholder="Upload image"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent w-full"
              />
              {errors?.image && errors?.image.type === "required" ? (
                <p className="text-accent">Image field is require </p>
              ) : null}
            </div>
            <div>
              <select
                {...register("blood_group", { required: true })}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent w-full">
                <option>Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
              {errors?.blood_group &&
              errors?.blood_group.type === "required" ? (
                <p className="text-accent">Select your blood group </p>
              ) : null}
            </div>
            <div>
              <select
                {...register("district", { required: true })}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent w-full">
                <option>District</option>
                {/* Dynamically map district options here */}
                {districts?.map((district) => (
                  <option key={district?.id} value={district?.id}>
                    {district?.name}
                  </option>
                ))}
              </select>
              {errors?.district && errors?.district.type === "required" ? (
                <p className="text-accent">Name field is require </p>
              ) : null}
            </div>
            <div>
              <select
                {...register("upazila", { required: true })}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent w-full">
                <option>Upazila</option>
                {currentDistrict.map((upazila) => (
                  <option key={upazila.id} value={upazila.name}>
                    {upazila.name}
                  </option>
                ))}
              </select>
              {errors?.upazila && errors?.upazila?.type === "required" ? (
                <p className="text-accent">Name field is require </p>
              ) : null}
            </div>
            <div>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Password"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent w-full"
              />

              {errors?.password && errors?.password.type === "required" ? (
                <p className="text-accent">Name field is require </p>
              ) : null}
            </div>
            <div>
              <input
                {...register("confirm_password", { required: true })}
                type="password"
                placeholder="Confirm Password"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent w-full"
              />
              {errors?.confirm_password &&
              errors?.confirm_password.type === "required" ? (
                <p className="text-accent">Name field is require </p>
              ) : null}
            </div>

            <button
              disabled={loading}
              type="submit"
              className={`col-span-1 md:col-span-2 bg-accent hover:bg-accent/90 text-white font-semibold py-2 rounded transition mt-2 ${
                loading ? "bg-red-300" : ""
              }`}>
              {loading ? "Processing..." : "Register"}
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-accent hover:underline font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side: Lottie Animation */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-slate-200 p-4">
        <div className="max-w-xs w-full">
          <Lottie animationData={registerAnimation} loop={true} />
        </div>
      </div>
    </div>
  );
}
