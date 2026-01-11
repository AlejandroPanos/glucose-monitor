import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteMeal } from "../../helpers/helpers";
import MealCard from "./MealCard";
import Empty from "../states/Empty";

const MealsGrid = ({ meals }) => {
  const queryClient = useQueryClient();

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
    if (window.confirm("Are you sure you want to delete this meal?")) {
      deleteMealMutation.mutate(id);
    }
  };

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {meals.length > 0 ? (
          meals.map((meal) => {
            return (
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
            );
          })
        ) : (
          <Empty message="Add a meal to start tracking the food you eat." />
        )}
      </div>
    </>
  );
};

export default MealsGrid;
