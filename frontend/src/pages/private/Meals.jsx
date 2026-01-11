import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { userMeals } from "../../helpers/helpers";

import PageBar from "../../components/private/PageBar";
import PageHeader from "../../components/private/PageHeader";
import MealsGrid from "../../components/private/MealsGrid";
import PaginationButtons from "../../components/private/PaginationButtons";
import Loading from "../../components/states/Loading";
import ErrorComp from "../../components/states/ErrorComp";

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

  if (mealsQuery.isPending && !mealsQuery.data) {
    return <Loading />;
  }

  if (mealsQuery.isError) {
    return <ErrorComp />;
  }

  const { meals, pagination } = mealsQuery.data;

  return (
    <>
      <div className="w-full mx-auto p-4 flex flex-col items-start gap-10">
        <PageBar />
        <PageHeader title="Meals" text="Track how meals affect your blood sugar over time." />
        <MealsGrid meals={meals} />
        <PaginationButtons
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          hasNextPage={pagination.hasNextPage}
          hasPrevPage={pagination.hasPrevPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Meals;
