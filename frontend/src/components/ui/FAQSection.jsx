import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Is GlucoTrack free to use?",
      answer:
        "Yes! GlucoTrack offers a free plan with all essential features for tracking your glucose levels and meals. We also offer premium plans with additional features like advanced analytics and export capabilities.",
    },
    {
      question: "How secure is my health data?",
      answer:
        "Your data security is our top priority. All data is encrypted in transit and at rest. We follow HIPAA compliance standards and never share your personal health information with third parties without your explicit consent.",
    },
    {
      question: "Can I export my glucose data?",
      answer:
        "Yes, you can export your glucose readings, meal logs, and charts in CSV or PDF format. This makes it easy to share your data with your healthcare provider or keep your own records.",
    },
    {
      question: "Does GlucoTrack work with glucose monitors?",
      answer:
        "Currently, GlucoTrack requires manual entry of glucose readings. We're actively working on integrations with popular continuous glucose monitors (CGMs) to automatically sync your data.",
    },
    {
      question: "Can I track data for multiple people?",
      answer:
        "Each account is designed for one person to ensure data privacy and personalized insights. However, caregivers can create separate accounts for each person they're helping to monitor.",
    },
    {
      question: "What devices does GlucoTrack support?",
      answer:
        "GlucoTrack works on any device with a modern web browser, including smartphones, tablets, and desktop computers. We also offer native iOS and Android apps for a better mobile experience.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="px-4 md:px-8 py-12 md:py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-12">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-600">Everything you need to know about GlucoTrack</p>
        </div>

        {/* FAQ Items */}
        <div className="w-full flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-4 pt-2">
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
