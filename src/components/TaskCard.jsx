import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { UserContext } from '../context/UserContext';

const TaskCard = () => {
    const { task, editTask, deleteTask } = useContext(TaskContext);
    const { user } = useContext(UserContext);

    const isAdmin = user?.email === "emin@gmail.com";
    console.log(isAdmin);

    return (
        <table className="w-100 border-collapse border shadow-md rounded-lg">
            <thead className="bg-gray-200">
                <tr>
                    <th className="px-4 py-2 text-left">Title</th>
                    <th className="px-4 py-2 text-left">Description</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    {isAdmin ? <th className="px-4 py-2 text-left">Actions</th> : []}
                </tr>
            </thead>
            <tbody>
                {task?.map((item, index) => (
                    <tr
                        key={item.id}
                        className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
                    >
                        <td className="px-4 py-2">{item.title}</td>
                        <td className="px-4 py-2">{item.description}</td>
                        <td className="px-4 py-2">{item.completed ? "✅ Completed" : "⏳ Waiting"}</td>

                        {isAdmin ? (
                            <td className="px-4 py-2 space-x-2">
                                <button
                                    onClick={() => {
                                        const newTitle = prompt("Enter new title:", item.title);
                                        if (!newTitle) return;

                                        const newDescription = prompt("Enter new description:", item.description);
                                        if (!newDescription) return;

                                        const newStatus = confirm("Mark as completed?") ? true : false;

                                        editTask(item.id, { ...item, title: newTitle, description: newDescription, completed: newStatus });
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
                        ) : []}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TaskCard;
