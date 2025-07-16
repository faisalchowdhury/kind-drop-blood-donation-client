import React from "react";

const Faq = () => {
  const faqs = [
    {
      question: "Who can donate blood?",
      answer:
        "Generally, healthy individuals aged 18-65, weighing at least 50 kg, can donate blood. However, certain medical conditions or medications may affect eligibility.",
    },
    {
      question: "How often can I donate blood?",
      answer:
        "You can donate whole blood every 56 days (approximately every 2 months). For plasma or platelets, donation intervals are different.",
    },
    {
      question: "Is blood donation safe?",
      answer:
        "Yes, it is safe. Sterile, disposable equipment is used for each donor, eliminating the risk of infection.",
    },
    {
      question: "How long does a blood donation take?",
      answer:
        "The blood donation process typically takes 8-10 minutes, while the entire visit including registration and rest may take around 45 minutes to an hour.",
    },
    {
      question: "What should I do before donating blood?",
      answer:
        "Eat a healthy meal, drink plenty of water, and avoid heavy exercise before donation. Ensure you bring a valid ID with you.",
    },
    {
      question: "What should I do after donating blood?",
      answer:
        "Rest for a few minutes, drink fluids, and avoid heavy exercise for the rest of the day. If you feel dizzy, sit or lie down until it passes.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-5 my-10 shadow-xl rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div key={index} className="collapse collapse-arrow bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">
              {faq.question}
            </div>
            <div className="collapse-content">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
