import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { userMeals } from "../../../helpers/helpers";

import PageBar from "../../../components/ui/PageBar";
import PageHeader from "../../../components/ui/PageHeader";
import MealsGrid from "../components/MealsGrid";
import PaginationButtons from "../../../components/ui/PaginationButtons";
import Loading from "../../../components/feedback/Loading";
import ErrorComp from "../../../components/feedback/ErrorComp";

const Meals = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 10;

  const mealsQuery = useQuery({
    queryKey: ["meals", currentPage],
    queryFn: () => userMeals(currentPage, mealsPerPage),
    keepPreviousData: true,
  });

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="w-full mx-auto p-4 flex flex-col items-start gap-10">
        <PageBar />
        <PageHeader title="Meals" text="Track how meals affect your blood sugar over time." />
        {mealsQuery.isPending && !mealsQuery.data && <Loading />}
        {mealsQuery.isError && <ErrorComp />}
        {mealsQuery.data && (
          <>
            <MealsGrid meals={mealsQuery.data.meals} />
            <PaginationButtons
              currentPage={mealsQuery.data.pagination.currentPage}
              totalPages={mealsQuery.data.pagination.totalPages}
              hasNextPage={mealsQuery.data.pagination.hasNextPage}
              hasPrevPage={mealsQuery.data.pagination.hasPrevPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Meals;
