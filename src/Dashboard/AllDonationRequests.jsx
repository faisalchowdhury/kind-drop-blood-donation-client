import React from "react";

export default function AllDonationRequests() {
  return (
    <div className="p-4 overflow-x-auto max-w-full">
      <h2 className="text-xl font-semibold mb-4 text-primary">
        All Donation Requests
      </h2>
      <div className="inline-block min-w-full align-middle">
        <table className="table table-sm table-pin-rows table-pin-cols w-max max-w-full">
          <thead>
            <tr>
              <th className="bg-white">No.</th>
              <td>Recipient Name</td>
              <td>Location</td>
              <td>Date</td>
              <td>Time</td>
              <td>Blood Group</td>
              <td>Status</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((id) => (
              <tr key={id} className="hover:bg-slate-200">
                <th className="bg-white">{id}</th>
                <td>John Doe</td>
                <td>Dhaka, Dhanmondi</td>
                <td>2025-07-15</td>
                <td>10:30 AM</td>
                <td>A+</td>
                <td>In Progress</td>
                <td className="flex gap-1 flex-wrap">
                  <button className="btn btn-success btn-xs">Done</button>
                  <button className="btn btn-error btn-xs">Cancel</button>
                  <button className="btn btn-info btn-xs">Edit</button>
                  <button className="btn btn-error btn-xs">Delete</button>
                  <button className="btn btn-neutral btn-xs">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
