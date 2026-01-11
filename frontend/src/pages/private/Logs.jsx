import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { userLogs } from "../../helpers/helpers";

import PageBar from "../../components/private/PageBar";
import PageHeader from "../../components/private/PageHeader";
import LogsGrid from "../../components/private/LogsGrid";
import PaginationButtons from "../../components/private/PaginationButtons";
import Loading from "../../components/states/Loading";
import ErrorComp from "../../components/states/ErrorComp";

const Logs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;

  const logsQuery = useQuery({
    queryKey: ["logs", currentPage],
    queryFn: () => userLogs(currentPage, logsPerPage),
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
        <PageHeader title="Logs" text="A complete record of your past readings and observations." />
        {logsQuery.isPending && !logsQuery.data && <Loading />}
        {logsQuery.isError && <ErrorComp />}
        {logsQuery.data && (
          <>
            <LogsGrid logs={logsQuery.data.logs} />
            <PaginationButtons
              currentPage={logsQuery.data.pagination.currentPage}
              totalPages={logsQuery.data.pagination.totalPages}
              hasNextPage={logsQuery.data.pagination.hasNextPage}
              hasPrevPage={logsQuery.data.pagination.hasPrevPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Logs;
