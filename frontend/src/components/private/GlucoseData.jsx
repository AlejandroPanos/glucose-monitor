import { useQuery } from "@tanstack/react-query";
import { userLogs } from "../../helpers/helpers";

import { useAuth } from "../../hooks/useAuth";
import Loading from "../states/Loading";
import ErrorComp from "../states/ErrorComp";

const GlucoseData = () => {
  const { user } = useAuth();

  const logsQuery = useQuery({
    queryKey: ["logs", "glucoseData"],
    queryFn: userLogs,
  });

  if (logsQuery.isPending) {
    return <Loading />;
  }

  if (logsQuery.isError) {
    return <ErrorComp />;
  }

  const totalLogs = logsQuery.data.logs.length;
  const glucoseSum = logsQuery.data.logs.reduce((sum, log) => sum + log.glucoseLevel, 0);
  const averageGlucose = parseInt(glucoseSum / totalLogs);
  const estimatedHbA1c = parseFloat(((averageGlucose + 46.7) / 28.7).toFixed(1));
  const logsInRange = logsQuery.data.logs.filter(
    (log) =>
      log.glucoseLevel >= user.targetGlucose.min && log.glucoseLevel <= user.targetGlucose.max
  ).length;
  const percentageInRange = ((logsInRange / totalLogs) * 100).toFixed(1);

  return (
    <>
      <div className="w-full flex items-center gap-4 flex-wrap md:flex-nowrap">
        <div className="w-full flex flex-col items-start gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all">
          <div className="flex items-center gap-2">
            <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
            <h2 className="text-sm font-semibold uppercase">Average Glucose</h2>
          </div>
          <p className="text-4xl font-bold">
            {isNaN(averageGlucose) ? "0" : averageGlucose}{" "}
            <span className="text-lg font-normal">mg/dl</span>
          </p>
        </div>
        <div className="w-full flex flex-col items-start gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all">
          <div className="flex items-center gap-2">
            <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
            <h2 className="text-sm font-semibold uppercase">Estimated HbA1C</h2>
          </div>
          <p className="text-4xl font-bold">
            {isNaN(estimatedHbA1c) ? "0" : estimatedHbA1c}{" "}
            <span className="text-lg font-normal">%</span>
          </p>
        </div>
        <div className="w-full flex flex-col items-start gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all">
          <div className="flex items-center gap-2">
            <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
            <h2 className="text-sm font-semibold uppercase">Time in Range</h2>
          </div>
          <p className="text-4xl font-bold">
            {isNaN(percentageInRange) ? "0" : percentageInRange}{" "}
            <span className="text-lg font-normal">%</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default GlucoseData;
