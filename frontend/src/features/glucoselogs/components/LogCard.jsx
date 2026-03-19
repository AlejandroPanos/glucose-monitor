import { Link } from "react-router";
import { format, formatDistanceToNow } from "date-fns";

import { Trash2, ArrowRight } from "lucide-react";

const LogCard = ({ id, date, glucose, notes, type, meal, onDelete }) => {
  return (
    <>
      <div className="w-full relative overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
        <div className="flex flex-col items-start gap-4 p-4">
          <div className="w-full flex items-start justify-between">
            <div className="flex flex-col items-start gap-1">
              <h3 className="text-lg font-semibold">{format(new Date(date), "MMM d, yyyy")}</h3>
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(date), { addSuffix: true })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block px-3 py-1 text-xs font-medium border border-blue-200 bg-blue-100 text-blue-600 rounded-full shadow-sm">
                {type}
              </span>
              <button
                onClick={() => onDelete(id)}
                className="inline-block p-1 text-xs font-medium border border-red-200 bg-red-100 text-red-600 rounded-lg shadow-sm hover:cursor-pointer hover:shadow-md transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-start gap-0.5">
              <p className="text-xs text-gray-500 ">Glucose Level</p>
              <p className="text-xl font-bold">
                {glucose} <span className="text-sm font-normal text-gray-500">mg/dL</span>
              </p>
            </div>
          </div>

          <div className="w-full flex items-end justify-between">
            <div className="flex flex-col items-start gap-1">
              <p className="text-xs text-gray-500 ">Notes</p>
              <p>{notes !== "" ? notes : "No notes for this log."}</p>
            </div>
            <Link
              to={`${id}`}
              className="flex items-center gap-1 text-blue-600 hover:cursor-pointer hover:translate-x-0.5 transition-all"
            >
              <p>View Log</p>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogCard;
