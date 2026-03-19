import { Link } from "react-router";
import { format } from "date-fns";

import { Trash2, ArrowRight } from "lucide-react";

const MealCard = ({ id, name, category, carbs, serving, date, onDelete }) => {
  return (
    <>
      <div className="w-full relative overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
        <div className="flex flex-col items-start gap-6 p-4">
          <div className="w-full flex items-start justify-between gap-2">
            <div className="flex flex-col items-start gap-1">
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="text-xs text-gray-500">{format(new Date(date), "MMM d, yyyy")}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block px-3 py-1 text-xs font-medium border border-blue-200 bg-blue-100 text-blue-600 rounded-full shadow-sm">
                {category}
              </span>
              <button
                onClick={() => onDelete(id)}
                className="inline-block p-1 text-xs font-medium border border-red-200 bg-red-100 text-red-600 rounded-lg shadow-sm hover:cursor-pointer hover:shadow-md transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="w-full flex items-end justify-between">
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-start gap-0.5">
                <p className="text-xs text-gray-500 mb-1">Carbs</p>
                <p className="font-semibold text-gray-900">{carbs}g</p>
              </div>
              <div className="flex flex-col items-start gap-0.5">
                <p className="text-xs text-gray-500 mb-1">Serving</p>
                <p className="font-semibold text-gray-900">{serving}</p>
              </div>
            </div>
            <Link
              to={`${id}`}
              className="flex items-center gap-1 text-blue-600 hover:cursor-pointer hover:translate-x-0.5 transition-all"
            >
              <p>View Meal</p>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MealCard;
