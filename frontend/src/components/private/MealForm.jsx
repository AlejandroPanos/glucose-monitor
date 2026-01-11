import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { addMeal } from "../../helpers/helpers";

const MealForm = () => {
  const navigate = useNavigate();

  const mealMutation = useMutation({
    mutationFn: addMeal,
    onSuccess: () => {
      navigate("/meals");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("meal");
    const category = formData.get("category");
    const carbsPerServing = formData.get("carbsPerServing");
    const serving = formData.get("servingSize");
    const servingUnit = formData.get("servingUnit");

    const servingSize = `${serving}${servingUnit}`;
    const newMeal = { name, category, carbsPerServing, servingSize };

    mealMutation.mutate(newMeal);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Meal Name */}
        <div className="w-full flex flex-col items-start gap-2">
          <label htmlFor="meal" className="font-medium text-gray-700">
            Meal Name*
          </label>
          <input
            type="text"
            name="meal"
            id="meal"
            placeholder="Meal Name"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm placeholder:text-gray-400 hover:cursor-text"
            required
          />
        </div>

        {/* Meal Category */}
        <div className="w-full flex flex-col items-start gap-2">
          <label htmlFor="category" className="font-medium text-gray-700">
            Category*
          </label>

          <div className="relative w-full">
            <select
              name="category"
              id="category"
              required
              defaultValue=""
              className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-300 shadow-sm bg-white appearance-none text-gray-900 transition-all invalid:text-gray-400"
            >
              <option value="" disabled hidden>
                Select a category
              </option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
              <option value="other">Other</option>
            </select>

            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Carbs Per Serving */}
        <div className="w-full flex flex-col items-start gap-2">
          <label htmlFor="carbsPerServing" className="font-medium text-gray-700">
            Carbs/Serving (g)*
          </label>
          <input
            type="number"
            name="carbsPerServing"
            id="carbsPerServing"
            placeholder="Carbs Per Serving"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm placeholder:text-gray-400 hover:cursor-text"
            min={0}
            required
          />
        </div>

        {/* Serving Size */}
        <div className="w-full flex flex-col items-start gap-2">
          <label htmlFor="servingSize" className="font-medium text-gray-700">
            Serving Size*
          </label>
          <div className="flex items-center w-full border border-gray-300 rounded-xl overflow-hidden shadow-sm bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
            <input
              type="number"
              name="servingSize"
              id="servingSize"
              placeholder="1"
              min={0}
              step="0.1"
              className="flex-1 px-4 py-3 border-0 focus:outline-none placeholder:text-gray-400"
              required
            />
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="relative">
              <select
                name="servingUnit"
                id="servingUnit"
                defaultValue="units"
                className="px-4 py-3 pr-10 border-0 bg-transparent appearance-none text-gray-900 focus:outline-none"
                required
              >
                <option value="g">g</option>
                <option value="kg">kg</option>
                <option value="lb">lb</option>
                <option value="c">c</option>
                <option value="L">L</option>
                <option value="mL">mL</option>
                <option value="oz">oz</option>
              </select>
              <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-red-500 text-xs font-medium">
            {mealMutation.error?.response?.data?.error}
          </p>
        </div>

        <button
          type="submit"
          className="w-full col-span-1 md:col-span-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium shadow-sm hover:cursor-pointer transition-all"
        >
          Add Meal
        </button>
      </form>
    </>
  );
};

export default MealForm;
