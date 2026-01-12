import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

import placeholderOne from "../../../images/placeholderOne.svg";
import placeholderTwo from "../../../images/placeholderTwo.svg";
import placeholderThree from "../../../images/placeholderThree.svg";
import placeholderFour from "../../../images/placeholderFour.svg";

const HeroSection = () => {
  const placeholders = [placeholderOne, placeholderTwo, placeholderThree, placeholderFour];

  return (
    <>
      <section id="hero">
        <div className="w-full min-h-svh py-12 md:py-16 mx-auto flex flex-col items-center justify-start gap-12 md:gap-16">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-blue-500 animate-ping"></div>
            </div>
            <p className="text-gray-600">The power of data in your hand</p>
          </div>

          <div className="flex flex-col items-center text-center gap-4 md:gap-6">
            <h1 className="w-full md:w-2/3 text-3xl md:text-6xl lg:text-6xl font-medium leading-tight md:leading-tight">
              Diabetes{" "}
              <span className="bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                doesn't
              </span>{" "}
              have to be complex.
            </h1>
            <p className="w-full md:w-2/4 text-sm text-gray-600 leading-relaxed">
              GlucoTrack helps you monitor glucose levels, track meals, and visualize data so you
              can make informed decisions about your health every day.
            </p>
          </div>

          <div>
            <Link
              to={"/register"}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 md:py-2.5 px-4 md:px-5 rounded-lg shadow-sm hover:shadow-md transition-all text-sm md:text-base active:scale-[0.98] hover:cursor-pointer"
            >
              <p>Try it free</p>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="w-full flex flex-col items-center gap-4 md:gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-gray-400 h-px w-10"></div>
              <p className="text-xs text-gray-600">Used by professionals at:</p>
              <div className="bg-gray-400 h-px w-10"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {placeholders.map((placeholder) => {
                return (
                  <img
                    className="w-30 h-auto grayscale opacity-80"
                    src={placeholder}
                    alt="A placeholder logo"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
