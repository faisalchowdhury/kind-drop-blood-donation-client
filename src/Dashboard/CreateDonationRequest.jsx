import React from "react";

export default function CreateDonationRequest() {
  return (
    <div className=" mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold text-primary mb-4">
        Create Donation Request
      </h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Requester Name"
          disabled
          className="border p-2 rounded w-full bg-gray-100"
        />
        <input
          type="email"
          placeholder="Requester Email"
          disabled
          className="border p-2 rounded w-full bg-gray-100"
        />
        <input
          type="text"
          placeholder="Recipient Name"
          className="border p-2 rounded w-full"
        />
        <select className="border p-2 rounded w-full">
          <option>Select District</option>
        </select>
        <select className="border p-2 rounded w-full">
          <option>Select Upazila</option>
        </select>
        <input
          type="text"
          placeholder="Hospital Name"
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Full Address Line"
          className="border p-2 rounded w-full"
        />
        <select className="border p-2 rounded w-full">
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
        <input type="date" className="border p-2 rounded w-full" />
        <input type="time" className="border p-2 rounded w-full" />
        <textarea
          placeholder="Request Message"
          className="border p-2 rounded w-full md:col-span-2"
          rows="4"></textarea>
        <button
          type="submit"
          className="bg-primary text-white p-2 rounded md:col-span-2">
          Request
        </button>
      </form>
    </div>
  );
}
