import { useQuery } from "@tanstack/react-query";
import { userMeals } from "../../helpers/helpers";

import PageBar from "../../components/private/PageBar";
import PageHeader from "../../components/private/PageHeader";
import MealsGrid from "../../components/private/MealsGrid";
import Loading from "../../components/states/Loading";
import ErrorComp from "../../components/states/ErrorComp";

const Meals = () => {
  const mealsQuery = useQuery({
    queryKey: ["meals"],
    queryFn: userMeals,
  });

  return (
    <>
      <div className="w-full mx-auto p-4 flex flex-col items-start gap-10">
        <PageBar />
        <PageHeader title="Meals" text="Track how meals affect your blood sugar over time." />
        {mealsQuery.isPending ? (
          <Loading />
        ) : mealsQuery.isError ? (
          <ErrorComp />
        ) : (
          <MealsGrid meals={mealsQuery.data} />
        )}
      </div>
    </>
  );
};

export default Meals;
