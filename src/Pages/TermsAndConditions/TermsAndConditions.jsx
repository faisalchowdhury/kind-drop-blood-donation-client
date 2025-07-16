import React from "react";

const TermsAndConditions = () => {
  return (
    <section className="max-w-5xl mx-auto p-5 my-10 shadow-xl rounded-lg">
      <h1 className="text-3xl font-semibold text-primary mb-4">
        Terms and Conditions
      </h1>
      <p className="text-gray-700 mb-4">Effective Date: [Insert Date]</p>

      <p className="mb-4">
        Welcome to our blood donation platform. By using our website, you agree
        to comply with and be bound by these Terms and Conditions. Please read
        them carefully.
      </p>

      <h2 className="text-xl font-semibold text-primary mt-6 mb-2">
        1️⃣ Use of Our Services
      </h2>
      <p className="mb-4">
        You agree to use our services for lawful purposes only and to provide
        accurate, truthful, and current information when creating an account or
        using donation services.
      </p>

      <h2 className="text-xl font-semibold text-primary mt-6 mb-2">
        2️⃣ User Accounts
      </h2>
      <p className="mb-4">
        You are responsible for maintaining the confidentiality of your account
        credentials and for all activities under your account. Notify us
        immediately if you suspect unauthorized use.
      </p>

      <h2 className="text-xl font-semibold text-primary mt-6 mb-2">
        3️⃣ Donations and Requests
      </h2>
      <p className="mb-4">
        Our platform connects donors and recipients to facilitate blood
        donations. We do not guarantee the availability of donors or recipients
        and are not responsible for the actions of users outside our platform.
      </p>

      <h2 className="text-xl font-semibold text-primary mt-6 mb-2">
        4️⃣ Payment Terms
      </h2>
      <p className="mb-4">
        Donations for funding initiatives are processed securely using Stripe.
        By making a payment, you agree to Stripe’s terms of service and our
        refund policies where applicable.
      </p>

      <h2 className="text-xl font-semibold text-primary mt-6 mb-2">
        5️⃣ Content Ownership
      </h2>
      <p className="mb-4">
        All content on our platform, including logos, graphics, and data, is
        owned by us or licensed for use. You may not copy, distribute, or modify
        our content without permission.
      </p>

      <h2 className="text-xl font-semibold text-primary mt-6 mb-2">
        6️⃣ User Conduct
      </h2>
      <p className="mb-4">
        You agree not to misuse our services by engaging in illegal activities,
        harassment, or attempting to harm other users. We reserve the right to
        suspend accounts that violate these terms.
      </p>

      <h2 className="text-xl font-semibold text-primary mt-6 mb-2">
        7️⃣ Termination
      </h2>
      <p className="mb-4">
        We may suspend or terminate your access to our platform if you breach
        these terms or if required by law.
      </p>

      <h2 className="text-xl font-semibold text-primary mt-6 mb-2">
        8️⃣ Limitation of Liability
      </h2>
      <p className="mb-4">
        We are not liable for any direct, indirect, or consequential damages
        arising from your use of our platform, including but not limited to the
        failure of donation arrangements.
      </p>

      <h2 className="text-xl font-semibold text-primary mt-6 mb-2">
        9️⃣ Changes to Terms
      </h2>
      <p className="mb-4">
        We reserve the right to modify these Terms and Conditions at any time.
        We will notify you of significant changes by posting the updated terms
        on our website.
      </p>

      <h2 className="text-xl font-semibold text-primary mt-6 mb-2">
        🔟 Governing Law
      </h2>
      <p className="mb-4">
        These terms are governed by the laws of [Your Country/Region].
      </p>

      <h2 className="text-xl font-semibold text-primary mt-6 mb-2">
        Contact Us
      </h2>
      <p className="mb-2">If you have any questions:</p>
      <ul className="list-inside mb-4 text-gray-700">
        <li>📧 Email: [your-support-email@example.com]</li>
        <li>📞 Phone: [optional]</li>
        <li>🏠 Address: [optional]</li>
      </ul>

      <p className="mt-4">
        By using our website, you agree to these Terms and Conditions.
      </p>
    </section>
  );
};

export default TermsAndConditions;
