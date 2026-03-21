import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteMeal } from "../../../helpers/helpers";
import MealCard from "./MealCard";
import Empty from "../../../components/feedback/Empty";
import ConfirmationModal from "../../../components/ui/ConfirmationModal";

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
        <ConfirmationModal action="Delete meal?" mutation={confirmDelete} cancel={cancelDelete} />
      )}
    </>
  );
};

export default MealsGrid;
