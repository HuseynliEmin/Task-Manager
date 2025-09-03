import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { UserContext } from "../context/UserContext";

const TaskCard = () => {
  const { task, editTask, deleteTask } = useContext(TaskContext);
  const { user } = useContext(UserContext);

  const isAdmin = user?.email === "emin@gmail.com";

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 9;

  if (!task) return <p>Loading...</p>;


  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = task.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(task.length / tasksPerPage);

  return (
    <div className="table-responsive custom-responsive mt-4">
      <table className="table table-bordered table-striped rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Status</th>
            {isAdmin ? (
              <th className="px-4 py-2 text-left">Actions</th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {currentTasks.map((item, index) => (
            <tr
              key={item.id}
              className={`border-b ${
                index % 2 === 0 ? "bg-white" : "bg-gray-100"
              }`}
            >
              <td className="px-4 py-2">{item.title}</td>
              <td className="px-4 py-2">{item.description}</td>
              <td className="px-4 py-2">
                {item.completed ? "✅ Completed" : "⏳ Waiting"}
              </td>

              {isAdmin ? (
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => {
                      const newTitle = prompt("Enter new title:", item.title);
                      if (!newTitle) return;

                      const newDescription = prompt(
                        "Enter new description:",
                        item.description
                      );
                      if (!newDescription) return;

                      const newStatus = confirm("Mark as completed?")
                        ? true
                        : false;

                      editTask(item.id, {
                        ...item,
                        title: newTitle,
                        description: newDescription,
                        completed: newStatus,
                      });
                    }}
                    className="bg-yellow-500 text-primary px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(item.id)}
                    className="bg-red-500 text-danger px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <nav className="mt-3">
        <ul className="pagination justify-content-center">
          <li className={`page-item me-2 ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
          </li>

          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item mx-2 ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TaskCard;
