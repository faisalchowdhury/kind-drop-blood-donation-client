import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import Lottie from "lottie-react";
import registerAnimation from "../../assets/Lottie/registration.json";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosBase from "../../Hooks/useAxiosBase";
export default function Registration() {
  const { createAccount, updateUserProfile } = useAuth();
  const [currentDistrict, setCurrentDistrict] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const axiosBase = useAxiosBase();
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
  // handle imagebb upload
  const uploadToImgbb = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "unsigned_preset");
    const imageInfo = await axios.post(
      `https://api.cloudinary.com/v1_1/dtvrjavzf/image/upload`,
      formData
    );
    console.log(imageInfo.data);
    return imageInfo.data;
  };

  // handle registration submit
  const submitRegistration = async (data) => {
    const { name, email, password } = data;
    const imageInfo = await uploadToImgbb(selectedFile);

    createAccount(email, password)
      .then((result) => {
        if (result?.user) {
          updateUserProfile(name, imageInfo.secure_url)
            .then(() => {
              // axiosBase
              //   .post("/add-user", data)
              //   .then((res) => console.log(res.data));
              Swal.fire({
                position: "center",
                icon: "success",
                title: "User have been created successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((err) => console.log("something went wrong"));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side: Registration Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-8 bg-white">
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
              type="submit"
              className="col-span-1 md:col-span-2 bg-accent hover:bg-accent/90 text-white font-semibold py-2 rounded transition mt-2">
              Register
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
