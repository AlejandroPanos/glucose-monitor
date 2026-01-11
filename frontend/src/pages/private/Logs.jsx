import { useQuery } from "@tanstack/react-query";
import { userLogs } from "../../helpers/helpers";

import PageBar from "../../components/private/PageBar";
import PageHeader from "../../components/private/PageHeader";
import LogsGrid from "../../components/private/LogsGrid";
import Loading from "../../components/states/Loading";
import ErrorComp from "../../components/states/ErrorComp";

const Logs = () => {
  const logsQuery = useQuery({
    queryKey: ["logs"],
    queryFn: userLogs,
  });

  return (
    <>
      <div className="w-full mx-auto p-4 flex flex-col items-start gap-10">
        <PageBar />
        <PageHeader title="Logs" text="A complete record of your past readings and observations." />
        {logsQuery.isPending ? (
          <Loading />
        ) : logsQuery.isError ? (
          <ErrorComp />
        ) : (
          <LogsGrid logs={logsQuery.data} />
        )}
      </div>
    </>
  );
};

export default Logs;
