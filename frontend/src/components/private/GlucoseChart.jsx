import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { userLogs } from "../../helpers/helpers";

import Loading from "../states/Loading";
import ErrorComp from "../states/ErrorComp";
import Empty from "../states/Empty";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg">
        <p className="text-sm font-semibold text-white">{payload[0].payload.date}</p>
        <p className="text-sm text-blue-400">Glucose: {payload[0].value} mg/dL</p>
      </div>
    );
  }
  return null;
};

const GlucoseChart = () => {
  const logsQuery = useQuery({
    queryKey: ["logs", "chart"],
    queryFn: userLogs,
  });

  if (logsQuery.isPending) {
    return <Loading />;
  }

  if (logsQuery.isError) {
    return <ErrorComp />;
  }

  const data = logsQuery.data.logs
    .slice(-10)
    .map((log, index) => ({
      id: log._id,
      date: format(new Date(log.date), "dd/MM"),
      fullDate: format(new Date(log.date), "dd/MM HH:mm"),
      glucose: log.glucoseLevel,
      index: index,
    }))
    .reverse();

  return (
    <>
      {data.length > 0 ? (
        <div className="w-full h-88">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, bottom: 15, left: 0 }}>
              <Line
                type="monotone"
                dataKey="glucose"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", r: 4 }}
                activeDot={{ r: 6 }}
              />
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="fullDate"
                tick={{ fill: "#6b7280", fontSize: 12 }}
                tickLine={{ stroke: "#e5e7eb" }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis
                domain={["dataMin - 10", "dataMax + 10"]}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                tickLine={{ stroke: "#e5e7eb" }}
              />
              <Tooltip content={<CustomTooltip />} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <Empty message="Add a log to see data displayed in your dashboard." />
      )}
    </>
  );
};

export default GlucoseChart;
