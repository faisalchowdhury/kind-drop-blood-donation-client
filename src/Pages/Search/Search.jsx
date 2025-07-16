import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosBase from "../../Hooks/useAxiosBase";
import Loading from "../../Components/Utilities/Loading";
import { FaSearch } from "react-icons/fa";

export default function Search() {
  const axiosBase = useAxiosBase();

  const [searchData, setSearchData] = useState({
    blood_group: "",
    district: "",
    upazila: "",
  });
  const [triggerSearch, setTriggerSearch] = useState(false);

  const { data: districts = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const res = await axios.get("/src/Data/district.json");
      return res.data[2].data;
    },
  });

  const { data: upazilas = [] } = useQuery({
    queryKey: ["upazilas"],
    queryFn: async () => {
      const res = await axios.get("/src/Data/upazila.json");
      return res.data[2].data;
    },
  });

  const filteredUpazilas = searchData.district
    ? upazilas.filter((upazila) => upazila.district_id == searchData.district)
    : [];

  const { data: donors = [], isLoading } = useQuery({
    queryKey: ["donorsSearch", searchData, triggerSearch],
    queryFn: async () => {
      const params = {
        blood_group: searchData.blood_group,
        district: searchData.district,
        upazila: searchData.upazila,
      };
      const res = await axiosBase.get("/search-donors", { params });
      return res.data;
    },
    enabled: triggerSearch,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setTriggerSearch(true);
  };
  {
    /* Loader while fetching */
  }
  {
    isLoading && <Loading />;
  }

  {
    /* Show message if no donors found after search */
  }
  {
    triggerSearch && !isLoading && donors.length === 0 && (
      <p className="text-center text-gray-500 mt-4">
        No donors found for your search.
      </p>
    );
  }

  {
    !triggerSearch && (
      <p className="text-center text-gray-500 mt-4">
        Please select your search criteria and click the search button to find
        donors.
      </p>
    );
  }

  return (
    <>
      <div className="min-h-[80vh] my-10">
        <div className=" bg-[url('https://i.ibb.co/ynvvDc6s/pexels-matthiaszomer-339620.jpg')] bg-cover bg-center rounded-lg h-[300px]">
          {/* Overlay */}
          <div className=" bg-slate-300/40 rounded-2xl h-full flex items-center">
            <div className="max-w-3xl mx-auto   ">
              <form
                onSubmit={handleSearch}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-primary text-white p-4 shadow rounded mb-6">
                <select
                  className="select select-bordered w-full border bg-primary rounded"
                  value={searchData.blood_group}
                  onChange={(e) =>
                    setSearchData({
                      ...searchData,
                      blood_group: e.target.value,
                    })
                  }>
                  <option value="">Select Blood Group</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    )
                  )}
                </select>

                <select
                  className="select select-bordered w-full border bg-primary rounded"
                  value={searchData.district}
                  onChange={(e) =>
                    setSearchData({
                      ...searchData,
                      district: e.target.value,
                      upazila: "",
                    })
                  }>
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>

                <select
                  className="select select-bordered w-full border bg-primary rounded"
                  value={searchData.upazila}
                  onChange={(e) =>
                    setSearchData({ ...searchData, upazila: e.target.value })
                  }
                  disabled={!searchData.district}>
                  <option value="">Select Upazila</option>
                  {filteredUpazilas.map((upazila) => (
                    <option key={upazila.id} value={upazila.name}>
                      {upazila.name}
                    </option>
                  ))}
                </select>

                <button
                  type="submit"
                  className="btn btn-primary border rounded sm:col-span-3 w-full">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* Default and no result box */}

        <div className="my-20 ">
          {isLoading && <Loading />}

          {!triggerSearch && (
            <div className="flex flex-col items-center">
              <FaSearch size={70} className="text-gray-500"></FaSearch>
              <p className="text-center text-gray-500 mt-4 text-xl">
                Please select your search criteria and click the search button
                to find donors.
              </p>
            </div>
          )}

          {triggerSearch && !isLoading && donors.length === 0 && (
            <p className="text-center text-gray-500 mt-4 text-xl">
              No donors found for your search.
            </p>
          )}
        </div>

        {/* Default and no result box */}
        <div>
          {donors.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {donors.map((donor) => (
                <div
                  key={donor._id}
                  className="bg-white shadow rounded-lg p-10  hover:shadow-md transition duration-300">
                  {/* Donor Image */}
                  <img
                    src={donor.image_url}
                    alt={donor.name}
                    className="w-24 h-24 rounded-full object-cover shadow "
                  />

                  {/* Name */}
                  <h3 className="text-2xl font-semibold mt-3 text-primary">
                    {donor.name}
                  </h3>

                  {/* Email */}
                  <p className="text-md text-gray-600">{donor.email}</p>

                  {/* Blood Group */}
                  <p className="mt-1">
                    Blood Group:{" "}
                    <span className="font-bold text-red-600">
                      {donor.blood_group}
                    </span>
                  </p>

                  {/* Location */}
                  <p className="text-md mt-1 text-gray-700">
                    {donor.upazila},{" "}
                    {districts.find((d) => d.id == donor.district_id)?.name}
                  </p>

                  {/* Status */}
                  <p
                    className={`text-md mt-1 font-medium ${
                      donor.status === "active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}>
                    {donor.status[0].toUpperCase() + donor.status.slice(1)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
