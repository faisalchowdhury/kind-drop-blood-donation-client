import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import useAxiosBase from "../../hooks/useAxiosBase";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Utilities/Loading";

export default function DonationPayment() {
  const stripe = useStripe();
  const elements = useElements();
  const axiosBase = useAxiosBase();
  const { user } = useAuth();
  const [amount, setAmount] = useState("");
  const [processing, setProcessing] = useState(false);

  // Fetch all donations
  const {
    data: donations = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allFundings"],
    queryFn: async () => {
      const res = await axiosBase.get("/all-funding-info");
      return res.data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      const { data } = await axiosBase.post("/create-payment-intent", {
        amount: parseFloat(amount),
      });
      const clientSecret = data.clientSecret;

      const card = elements.getElement(CardElement);
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: user?.displayName || "Anonymous Donor",
              email: user?.email || "anonymous@donor.com",
            },
          },
        }
      );

      if (error) {
        Swal.fire("Error", error.message, "error");
      } else if (paymentIntent.status === "succeeded") {
        Swal.fire("Thank You!", "Your donation was successful.", "success");

        const fundDonation = {
          name: user?.displayName,
          email: user?.email,
          amount: paymentIntent.amount / 100,
          depositDate: new Date().toISOString(),
        };
        await axiosBase.post("/add-funding-info", fundDonation);

        //  Clear form and card field
        elements.getElement(CardElement).clear();
        setAmount("");

        //  Refetch funding list
        refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong during payment.", "error");
    } finally {
      setProcessing(false);
    }
  };
  isLoading && <Loading></Loading>;
  return (
    <>
      <div className="">
        <div className=" mx-auto  py-10  space-y-6">
          <div className="grid md:grid-cols-3 items-center gap-10">
            <div className=" md:col-span-2 space-y-5">
              <h2 className="text-4xl text-accent font-semibold">
                {" "}
                Your Support Can Save Lives!
              </h2>
              <p>
                Every day, countless individuals depend on our organization for
                timely blood donations and emergency support. Your contribution,
                no matter how small, helps us reach more people, save lives, and
                continue this mission of kindness and hope. <br />
                By donating today, you are not just giving funds — you are
                giving hope, health, and a second chance to someone in need.
              </p>
            </div>
            <div className=" bg-white shadow rounded p-6 space-y-4">
              <h2 className="text-xl font-semibold ">Donate Now</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  className="input w-full border rounded"
                  placeholder="Name"
                />
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="input  w-full border rounded"
                  placeholder="Email"
                />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount (USD)"
                  required
                  className="input w-full border rounded"
                />
                <div className="border p-2 rounded">
                  <CardElement />
                </div>
                <button
                  disabled={!stripe || processing}
                  type="submit"
                  className="btn btn-primary text-white w-full">
                  {processing ? "Processing..." : "Donate Now"}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white shadow rounded p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Donors Who Have Funded Us
            </h3>

            {donations.length === 0 ? (
              <p className="text-center text-gray-500">No donations yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-lg">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Amount (USD)</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.map((donor, index) => (
                      <tr
                        key={donor._id || index}
                        className={
                          index % 2 === 0 ? "bg-white" : "bg-slate-100"
                        }>
                        <td>{index + 1}</td>
                        <td>{donor.name}</td>
                        <td>{donor.email}</td>
                        <td>${donor.amount.toFixed(2)}</td>
                        <td>
                          {new Date(donor.depositDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
