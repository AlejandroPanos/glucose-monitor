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

  if (logsQuery.isPending && !logsQuery.data) {
    return <Loading />;
  }

  if (logsQuery.isError) {
    return <ErrorComp />;
  }

  const { logs, pagination } = logsQuery.data;

  return (
    <>
      <div className="w-full mx-auto p-4 flex flex-col items-start gap-10">
        <PageBar />
        <PageHeader title="Logs" text="A complete record of your past readings and observations." />
        <LogsGrid logs={logs} />
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

export default Logs;
