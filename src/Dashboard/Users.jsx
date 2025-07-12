import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosBase from "../Hooks/useAxiosBase";

const Users = () => {
  const axiosBase = useAxiosBase();
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const result = await axiosBase.get("/users");
      return result.data;
    },
  });

  // Load District

  const { data: districts = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: () =>
      axios.get(`/src/Data/district.json`).then((res) => res?.data[2]?.data),
  });
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Blood Group</th>
              <th>Creation Date</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row  */}

            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={user.image_url}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                        <div className="text-sm opacity-50">{user.upazila}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    {districts.length > 0 &&
                      districts.find(
                        (district) => district.id == user.district_id
                      )?.name}
                  </td>
                  <th>
                    <button className="w-full bg-red-600 text-white hover:none">
                      {user.blood_group}
                    </button>
                  </th>
                  <td>{new Date(user.creation_date).toLocaleDateString()}</td>
                  <td>{user.role}</td>
                  <td>
                    {user.status === "active" ? (
                      <button
                        title="Click to block user"
                        className="btn bg-green-600 text-white">
                        Active
                      </button>
                    ) : (
                      <button
                        title="Click to active user"
                        className="btn bg-red-600 text-white">
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
