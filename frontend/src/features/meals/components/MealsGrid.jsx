import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteMeal } from "../../../helpers/helpers";
import MealCard from "./MealCard";
import Empty from "../../../components/feedback/Empty";

const MealsGrid = ({ meals }) => {
  const queryClient = useQueryClient();
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const deleteMealMutation = useMutation({
    mutationFn: deleteMeal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meals"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleDelete = (id) => {
    setPendingDeleteId(id);
  };

  const confirmDelete = () => {
    deleteMealMutation.mutate(pendingDeleteId);
    setPendingDeleteId(null);
  };

  const cancelDelete = () => {
    setPendingDeleteId(null);
  };

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <MealCard
              key={meal._id}
              id={meal._id}
              name={meal.name}
              category={meal.category}
              carbs={meal.carbsPerServing}
              serving={meal.servingSize}
              date={meal.createdAt}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <Empty message="Add a meal to start tracking the food you eat." />
        )}
      </div>

      {/* Confirmation Modal */}
      {pendingDeleteId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={cancelDelete}
        >
          <div
            className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm mx-4 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-gray-800">Delete meal?</h2>
            <p className="text-gray-500 text-sm">This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MealsGrid;
