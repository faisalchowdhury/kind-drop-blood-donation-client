import React, { useEffect, useState } from "react";
import { FaUsersLine } from "react-icons/fa6";
import { BiSolidDonateBlood, BiSolidDonateHeart } from "react-icons/bi";
import { FaHandsHelping } from "react-icons/fa";
import useAxiosBase from "../Hooks/useAxiosBase";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const [fundCount, setFundCount] = useState(0);
  const [donationCount, setDonationCount] = useState(0);
  const [pendingDonationCount, setPendingDonationCount] = useState(0);
  const axiosBase = useAxiosBase();
  // Total user
  useEffect(() => {
    axiosBase.get("/total-users").then((res) => setFundCount(res.data.count));
  }, []);

  // Total function amount
  const { data: totalAmount = 0 } = useQuery({
    queryKey: ["totalAmount"],
    queryFn: async () => {
      const res = await axiosBase.get("/total-donated-amount");
      return res.data.totalAmount;
    },
  });

  // Total donation count
  useEffect(() => {
    axiosBase
      .get("/total-donation-request-count")
      .then((res) => setDonationCount(res.data.count));
  }, []);
  // Total pending donation count
  useEffect(() => {
    axiosBase
      .get("/total-pending-donation-request")
      .then((res) => setPendingDonationCount(res.data.totalPending));
  }, []);

  return (
    <>
      <div className="space-y-5">
        <div className="text-4xl">Welcome to dashboard</div>
        <div className="grid gap-5 md:grid-cols-4">
          <div className="p-5 flex gap-5 items-center rounded-lg shadow  border bg-sky-100 border-slate-600 border-dashed ">
            <FaUsersLine size={40} />
            <div>
              <h3 className="text-xl font-medium text-primary">Total User</h3>
              <p className="text-2xl">{fundCount}</p>
            </div>
          </div>
          <div className="p-5 flex gap-5 items-center rounded-lg shadow  border bg-sky-100 border-slate-600 border-dashed ">
            <BiSolidDonateHeart size={40} />
            <div>
              <h3 className="text-xl font-medium text-primary">
                Total Funding
              </h3>
              <p className="text-2xl">{totalAmount} $</p>
            </div>
          </div>
          <div className="p-5 flex gap-5 items-center rounded-lg shadow  border bg-sky-100 border-slate-600 border-dashed ">
            <BiSolidDonateBlood size={40} />
            <div>
              <h3 className="text-xl font-medium text-primary">
                Total request
              </h3>
              <p className="text-2xl">{donationCount}</p>
            </div>
          </div>

          <div className="p-5 flex gap-5 items-center rounded-lg shadow  border bg-sky-100 border-slate-600 border-dashed ">
            <FaHandsHelping size={40} />
            <div>
              <h3 className="text-xl font-medium text-primary">
                Pending request
              </h3>
              <p className="text-2xl">{pendingDonationCount}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
