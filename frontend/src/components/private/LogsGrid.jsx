import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteLog } from "../../helpers/helpers";
import LogCard from "./LogCard";
import Empty from "../states/Empty";

const LogsGrid = ({ logs }) => {
  const queryClient = useQueryClient();

  const deleteLogMutation = useMutation({
    mutationFn: deleteLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logs"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this log?")) {
      deleteLogMutation.mutate(id);
    }
  };

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {logs.length > 0 ? (
          logs.map((log) => {
            return (
              <LogCard
                key={log._id}
                id={log._id}
                date={log.date}
                glucose={log.glucoseLevel}
                notes={log.notes}
                type={log.type}
                meal={log.mealId}
                onDelete={handleDelete}
              />
            );
          })
        ) : (
          <Empty message="Add a log to start tracking your blood sugar." />
        )}
      </div>
    </>
  );
};

export default LogsGrid;
