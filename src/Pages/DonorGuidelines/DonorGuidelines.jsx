import React from "react";

const DonorGuidelines = () => {
  return (
    <section className="max-w-5xl mx-auto p-5 my-10 shadow-xl rounded-lg">
      <h1 className="text-3xl font-semibold text-primary mb-4">
        Donor Guidelines
      </h1>
      <p className="text-gray-700 mb-4">
        Thank you for your interest in saving lives through blood donation.
        Please read these guidelines carefully before donating blood on our
        platform.
      </p>

      <h2 className="text-xl font-semibold text-primary mt-6 mb-2">
        1️⃣ Eligibility Criteria
      </h2>
      <p className="mb-4">
        - You must be in good general health and feel well on the day of
        donation. <br />
        - Age requirement: 18-60 years (or as per your local guidelines). <br />
        - Minimum weight: 50 kg (110 lbs). <br />- Ensure you have had a good
        meal and are well-hydrated before donating.
      </p>

      <h2 className="text-xl font-semibold text-primary mt-6 mb-2">
        2️⃣ When You Should Not Donate
      </h2>
      <p className="mb-4">Please do not donate if:</p>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        <li>You have cold, flu, sore throat, or fever.</li>
        <li>You are currently taking antibiotics or certain medications.</li>
        <li>You have had major surgery within the past 6 months.</li>
        <li>
          You have had recent tattoos or piercings (within the past 6 months).
        </li>
        <li>You have tested positive for HIV or hepatitis.</li>
      </ul>

      <h2 className="text-xl font-semibold text-primary mt-6 mb-2">
        3️⃣ Before Donation
      </h2>
      <p className="mb-4">
        - Get adequate sleep the night before donation. <br />
        - Eat a healthy meal and drink plenty of water. <br />- Avoid heavy
        exercise before your donation appointment.
      </p>

      <h2 className="text-xl font-semibold text-primary mt-6 mb-2">
        4️⃣ During Donation
      </h2>
      <p className="mb-4">
        - Stay relaxed and inform the staff if you feel unwell. <br />- The
        donation process typically takes around 10-15 minutes.
      </p>

      <h2 className="text-xl font-semibold text-primary mt-6 mb-2">
        5️⃣ After Donation
      </h2>
      <p className="mb-4">
        - Rest for at least 10 minutes and have some light refreshments
        provided. <br />- Avoid heavy exercise or lifting heavy objects for the
        rest of the day. <br />- Continue to drink water to stay hydrated.
      </p>

      <h2 className="text-xl font-semibold text-primary mt-6 mb-2">
        6️⃣ Privacy and Safety
      </h2>
      <p className="mb-4">
        Your health and safety are our top priorities. All your personal and
        health information is kept confidential, and all donations are conducted
        under safe and sterile conditions.
      </p>

      <h2 className="text-xl font-semibold text-primary mt-6 mb-2">
        7️⃣ Contact for Assistance
      </h2>
      <p className="mb-4">
        If you have questions before or after donation, please reach out:
      </p>
      <ul className="list-inside mb-4 text-gray-700">
        <li>📧 Email: [your-support-email@example.com]</li>
        <li>📞 Phone: [optional]</li>
        <li>🏠 Address: [optional]</li>
      </ul>

      <p className="mt-4">
        Thank you for being a hero and making a difference by donating blood.
      </p>
    </section>
  );
};

export default DonorGuidelines;
