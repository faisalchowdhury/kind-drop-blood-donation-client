import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="max-w-5xl mx-auto p-5 my-10 shadow-xl rounded-lg">
      <h1 className="text-3xl font-semibold text-primary mb-4">
        Privacy Policy
      </h1>
      <p className="text-gray-700 mb-4">Effective Date: [Insert Date]</p>

      <p className="mb-4">
        Thank you for using our blood donation platform. Your privacy is
        important to us, and this Privacy Policy explains how we collect, use,
        and protect your personal information.
      </p>

      <h2 className="text-xl font-semibold text-primary mt-6 mb-2">
        1️⃣ Information We Collect
      </h2>
      <p className="mb-2">We may collect:</p>
      <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700">
        <li>
          <strong>Personal Information:</strong> Name, email, phone, blood
          group, district, upazila, and profile image for account setup.
        </li>
        <li>
          <strong>Donation Information:</strong> Details of your donation
          requests and activities.
        </li>
        <li>
          <strong>Payment Information:</strong> We use Stripe for secure
          payments and do not store card details.
        </li>
        <li>
          <strong>Usage Data:</strong> Pages visited and actions taken on our
          website.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-primary mt-6 mb-2">
        2️⃣ How We Use Your Information
      </h2>
      <p className="mb-4">
        We use your information to facilitate blood donation matching, manage
        your profile, communicate with you, improve our services, handle secure
        payments, and ensure safety and compliance.
      </p>

      <h2 className="text-xl font-semibold text-primary mt-6 mb-2">
        3️⃣ Sharing of Information
      </h2>
      <p className="mb-4">
        We do not sell your personal data. We may share information:
      </p>
      <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700">
        <li>With recipients when you agree to donate.</li>
        <li>With Stripe and Firebase for payments and authentication.</li>
        <li>To comply with laws or protect user safety.</li>
      </ul>

      <h2 className="text-xl font-semibold text-primary mt-6 mb-2">
        4️⃣ Data Security
      </h2>
      <p className="mb-4">
        We use secure technologies including Firebase Authentication and HTTPS
        to protect your data, with access limited to authorized personnel.
      </p>

      <h2 className="text-xl font-semibold text-primary mt-6 mb-2">
        5️⃣ Your Rights
      </h2>
      <p className="mb-4">
        You can update your profile, request deletion of your data, and opt-out
        of non-essential communications by contacting us.
      </p>

      <h2 className="text-xl font-semibold text-primary mt-6 mb-2">
        6️⃣ Children’s Privacy
      </h2>
      <p className="mb-4">
        Our services are not intended for children under 13, and we do not
        knowingly collect data from children.
      </p>

      <h2 className="text-xl font-semibold text-primary mt-6 mb-2">
        7️⃣ Changes to This Policy
      </h2>
      <p className="mb-4">
        We may update this Privacy Policy and will notify you of significant
        changes via email or our website.
      </p>

      <p className="mt-4">
        By using our website, you consent to this Privacy Policy.
      </p>
    </section>
  );
};

export default PrivacyPolicy;
