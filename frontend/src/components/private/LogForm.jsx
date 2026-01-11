import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { addLog, userMeals } from "../../helpers/helpers";

const LogForm = () => {
  const navigate = useNavigate();

  const logMutation = useMutation({
    mutationFn: addLog,
    onSuccess: () => {
      navigate("/logs");
    },
  });

  const mealsQuery = useQuery({
    queryKey: ["meals", "select"],
    queryFn: userMeals,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const type = formData.get("type");
    const glucoseLevel = formData.get("glucoseLevel");
    const date = formData.get("date");
    const associatedMeal = formData.get("associatedMeal");
    const notes = formData.get("notes");
    const log = { type, glucoseLevel, date, associatedMeal, notes };

    logMutation.mutate(log);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Log Type */}
        <div className="w-full flex flex-col items-start gap-2">
          <label htmlFor="type" className="font-medium text-gray-700">
            Type*
          </label>

          <div className="relative w-full">
            <select
              name="type"
              id="type"
              required
              defaultValue=""
              className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-300 shadow-sm bg-white appearance-none text-gray-900 transition-all invalid:text-gray-400"
            >
              <option value="" disabled hidden>
                Select a type
              </option>
              <option value="before_meal">Before Meal</option>
              <option value="after_meal">After Meal</option>
              <option value="fasting">Fasting</option>
              <option value="bedtime">Bedtime</option>
              <option value="random">Random</option>
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

        {/* Glucose Level */}
        <div className="w-full flex flex-col items-start gap-2">
          <label htmlFor="glucoseLevel" className="font-medium text-gray-700">
            Glucose Level (mg/dl)*
          </label>
          <input
            type="number"
            name="glucoseLevel"
            placeholder="Glucose Level"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm placeholder:text-gray-400 hover:cursor-text"
            min={0}
            required
          />
        </div>

        {/* Date */}
        <div className="w-full flex flex-col items-start gap-2">
          <label htmlFor="date" className="font-medium text-gray-700">
            Date*
          </label>
          <input
            type="date"
            name="date"
            id="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm text-gray-900 hover:cursor-text focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Associated Meal */}
        <div className="w-full flex flex-col items-start gap-2">
          <label htmlFor="associatedMeal" className="font-medium text-gray-700">
            Associated Meal*
          </label>

          <div className="relative w-full">
            <select
              name="associatedMeal"
              id="associatedMeal"
              defaultValue=""
              disabled={mealsQuery.isPending || mealsQuery.isError}
              className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-300 shadow-sm bg-white appearance-none text-gray-900 transition-all invalid:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              required
            >
              <option value="" disabled hidden>
                {mealsQuery.isPending
                  ? "Loading meals..."
                  : mealsQuery.isError
                  ? "Error loading meals"
                  : "Select a meal"}
              </option>

              {mealsQuery.data &&
                mealsQuery.data.map((meal) => (
                  <option key={meal._id} value={meal._id}>
                    {meal.name}
                  </option>
                ))}

              <option value="no_meal">No Meal</option>
            </select>

            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {mealsQuery.isPending ? (
                // Loading spinner
                <svg
                  className="animate-spin h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                // Dropdown arrow
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
              )}
            </div>
          </div>

          {mealsQuery.isError && (
            <p className="text-red-500 text-xs">Failed to load meals. Please try again.</p>
          )}
        </div>

        {/* Notes */}
        <div className="col-span-1 md:col-span-2 w-full flex flex-col items-start gap-2">
          <label htmlFor="notes" className="font-medium text-gray-700">
            Notes
          </label>
          <textarea
            name="notes"
            id="notes"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm placeholder:text-gray-400 hover:cursor-text"
            placeholder="Add your notes here..."
            rows={5}
          ></textarea>
        </div>

        <div>
          <p className="text-red-500 text-xs font-medium">
            {logMutation.error?.response?.data?.error}
          </p>
        </div>

        <button
          type="submit"
          className="w-full col-span-1 md:col-span-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium shadow-sm hover:cursor-pointer transition-all"
        >
          Add Log
        </button>
      </form>
    </>
  );
};

export default LogForm;
