import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";

import { getUsers, deleteUser } from "../../helpers/helpers";
import Loading from "../states/Loading";
import ErrorComp from "../states/ErrorComp";

const UsersList = () => {
  const queryClient = useQueryClient();
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const handleDelete = (id) => {
    setPendingDeleteId(id);
  };

  const confirmDelete = () => {
    deleteUserMutation.mutate(pendingDeleteId);
    setPendingDeleteId(null);
  };

  const cancelDelete = () => {
    setPendingDeleteId(null);
  };

  if (usersQuery.isPending) {
    return <Loading />;
  }

  if (usersQuery.isError) {
    return <ErrorComp />;
  }

  return (
    <>
      <div className="w-full overflow-x-auto">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Role</th>
                <th className="px-6 py-3 text-right font-semibold text-gray-700">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {usersQuery.data.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3">{user.name}</td>
                  <td className="px-6 py-3 text-gray-600">{user.email}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-medium rounded-full shadow-sm ${
                        user.role === "admin"
                          ? "border border-blue-200 bg-blue-100 text-blue-600"
                          : "border border-amber-200 bg-amber-100 text-amber-600"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="p-2 text-xs font-medium border border-red-200 bg-red-100 text-red-600 rounded-lg shadow-sm hover:cursor-pointer hover:shadow-md transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {usersQuery.data.map((user) => (
            <div key={user.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-base font-semibold">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="p-2 text-xs font-medium border border-red-200 bg-red-100 text-red-600 rounded-lg shadow-sm hover:cursor-pointer hover:shadow-md transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center">
                <span
                  className={`inline-block px-3 py-1 text-xs font-medium rounded-full shadow-sm ${
                    user.role === "admin"
                      ? "border border-blue-200 bg-blue-100 text-blue-600"
                      : "border border-amber-200 bg-amber-100 text-amber-600"
                  }`}
                >
                  {user.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      {pendingDeleteId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={cancelDelete}
        >
          <div
            className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm mx-4 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-gray-800">Delete user?</h2>
            <p className="text-gray-500 text-sm">This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UsersList;
