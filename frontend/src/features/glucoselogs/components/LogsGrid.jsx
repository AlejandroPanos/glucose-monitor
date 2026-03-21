import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteLog } from "../../../helpers/helpers";
import LogCard from "./LogCard";
import Empty from "../../../components/feedback/Empty";
import ConfirmationModal from "../../../components/ui/ConfirmationModal";

const LogsGrid = ({ logs }) => {
  const queryClient = useQueryClient();
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

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
    setPendingDeleteId(id);
  };

  const confirmDelete = () => {
    deleteLogMutation.mutate(pendingDeleteId);
    setPendingDeleteId(null);
  };

  const cancelDelete = () => {
    setPendingDeleteId(null);
  };

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {logs.length > 0 ? (
          logs.map((log) => (
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
          ))
        ) : (
          <Empty message="Add a log to start tracking your blood sugar." />
        )}
      </div>

      {/* Confirmation Modal */}
      {pendingDeleteId && (
        <ConfirmationModal action="Delete log?" mutation={confirmDelete} cancel={cancelDelete} />
      )}
    </>
  );
};

export default LogsGrid;
