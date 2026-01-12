import { Activity, Utensils, LineChart, Target } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      title: "Glucose Readings",
      description:
        "Log your blood sugar levels throughout the day—before meals, after meals, fasting, or at bedtime",
      icon: Activity,
      color: "blue",
    },
    {
      title: "Monitor Meals",
      description:
        "Record what you eat and track carbohydrates per serving. Understand how different foods affect your blood sugar.",
      icon: Utensils,
      color: "blue",
    },
    {
      title: "Visualize Trends",
      description:
        "See your glucose patterns over time with easy-to-read charts. Identify trends, spot potential issues early, and share insights.",
      icon: LineChart,
      color: "blue",
    },
    {
      title: "Set Target Range",
      description: "Define your personal glucose targets and see how often you stay within range.",
      icon: Target,
      color: "blue",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-orange-100 text-orange-600",
    };
    return colors[color];
  };

  return (
    <section id="features" className="px-4 md:px-8 py-12 md:py-16">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-start gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">App Features</h2>
          <p className="text-sm text-gray-600">
            Every feature you need to take care of your diabetes.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-6 md:p-8 flex flex-col items-start gap-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColorClasses(
                    feature.color
                  )}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
