import { useParams, Link, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";

import { editMeal, getMeal } from "../../helpers/helpers";
import Loading from "../states/Loading";
import ErrorComp from "../states/ErrorComp";

const MealEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mealQuery = useQuery({
    queryKey: ["meal", id],
    queryFn: () => getMeal(id),
  });

  const editMealMutation = useMutation({
    mutationFn: editMeal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meal", id] });
      queryClient.invalidateQueries({ queryKey: ["meals"] });
      navigate(`/meals/${id}`);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (mealQuery.isPending) {
    return <Loading />;
  }

  if (mealQuery.isError) {
    return <ErrorComp />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("meal");
    const category = formData.get("category");
    const carbsPerServing = formData.get("carbsPerServing");
    const serving = formData.get("servingSize");
    const servingUnit = formData.get("servingUnit");

    const servingSize = `${serving}${servingUnit}`;
    const updatedMeal = { name, category, carbsPerServing, servingSize };

    editMealMutation.mutate({ id, updatedMeal });
  };

  return (
    <>
      <div className="w-full flex flex-col items-start gap-4">
        {/* Header */}
        <div className="w-full">
          <Link
            to={`/meals/${id}`}
            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Meal</span>
          </Link>
        </div>

        {/* Main Card */}
        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header Section */}
          <div className="w-full p-4 md:p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <h2 className="font-bold text-xl">{mealQuery.data.name}</h2>
              <span className="inline-block px-3 py-1 text-xs font-medium border border-blue-200 bg-blue-100 text-blue-600 rounded-full shadow-sm">
                {mealQuery.data.category}
              </span>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full p-4 md:p-6 flex flex-col items-start gap-6"
          >
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
                defaultValue={mealQuery.data.name}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white shadow-sm placeholder:text-gray-400 hover:cursor-text"
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
                  defaultValue={mealQuery.data.category}
                  className="w-full px-4 py-2 pr-10 rounded-xl border border-gray-300 shadow-sm bg-white appearance-none text-gray-900 transition-all invalid:text-gray-400"
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
                defaultValue={mealQuery.data.carbsPerServing}
                placeholder="Carbs Per Serving"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white shadow-sm placeholder:text-gray-400 hover:cursor-text"
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
                  defaultValue={parseInt(mealQuery.data.servingSize)}
                  placeholder="1"
                  min={0}
                  step="0.1"
                  className="flex-1 px-4 py-2 border-0 focus:outline-none placeholder:text-gray-400"
                  required
                />
                <div className="h-8 w-px bg-gray-300"></div>
                <div className="relative">
                  <select
                    name="servingUnit"
                    id="servingUnit"
                    defaultValue={mealQuery.data.servingSize.replace(/\d+/g, "")}
                    className="px-4 py-2 pr-10 border-0 bg-transparent appearance-none text-gray-900 focus:outline-none"
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
                {editMealMutation.error?.response?.data?.error}
              </p>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium shadow-sm hover:cursor-pointer hover:shadow-md transition-all"
            >
              Edit Meal
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default MealEdit;
