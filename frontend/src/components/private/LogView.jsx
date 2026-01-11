import { useParams, Link, useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";

import { getLog, deleteLog } from "../../helpers/helpers";
import Loading from "../states/Loading";
import ErrorComp from "../states/ErrorComp";

const LogView = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logQuery = useQuery({
    queryKey: ["log", id],
    queryFn: () => getLog(id),
  });

  const deleteLogMutation = useMutation({
    mutationFn: deleteLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logs"] });
      navigate("/logs");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (logQuery.isPending) {
    return <Loading />;
  }

  if (logQuery.isError) {
    return <ErrorComp />;
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this log?")) {
      deleteLogMutation.mutate(id);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-start gap-4">
        {/* Header */}
        <div className="w-full">
          <Link
            to="/logs"
            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Logs</span>
          </Link>
        </div>

        {/* Main Card */}
        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header Section */}
          <div className="w-full p-4 md:p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <h2 className="font-bold text-xl">
                {format(new Date(logQuery.data.date), "MMM d, yyyy")}
              </h2>
              <span className="inline-block px-3 py-1 text-xs font-medium border border-blue-200 bg-blue-100 text-blue-600 rounded-full shadow-sm">
                {logQuery.data.type}
              </span>
            </div>
          </div>

          {/* Flex container */}
          <div className="w-full p-4 md:p-6 flex flex-col items-start gap-2">
            <div className="w-full flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Created</span>
              <span className="font-semibold">
                {format(new Date(logQuery.data.createdAt), "MMM d, yyyy")}
              </span>
            </div>
            <div className="w-full flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Type</span>
              <span className="font-semibold">{logQuery.data.type}</span>
            </div>
            <div className="w-full flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Glucose Level</span>
              <span className="font-semibold">{logQuery.data.glucoseLevel}</span>
            </div>
            <div className="w-full flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Associated Meal</span>
              <span className="font-semibold">
                {logQuery.data.mealId
                  ? logQuery.data.mealId.name
                  : "No meal associated with this log."}
              </span>
            </div>
            <div className="w-full flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Notes</span>
              <span className="font-semibold">
                {logQuery.data.notes ? logQuery.data.notes : "No notes for this log."}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full p-4 md:p-6 flex flex-col md:flex-row items-center gap-2">
            <Link
              to={`/logs/${id}/edit`}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium shadow-sm hover:cursor-pointer hover:shadow-md transition-all"
            >
              <Edit className="w-4 h-4" />
              Edit
            </Link>
            <button
              onClick={() => handleDelete(logQuery.data._id)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-red-200 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg font-medium shadow-sm hover:cursor-pointer hover:shadow-md transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogView;
