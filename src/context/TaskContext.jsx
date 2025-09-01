import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const TaskContext = createContext()

const API_URL = "http://localhost:5000/tasks"

export const TaskProvider = ({ children }) => {
    const [task, setTask] = useState(null);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const response = await axios.get(API_URL);
                setTask(response.data);
            } catch (error) {
                console.log(error);
            }

        }
        getTasks();
    }, []);

    const editTask = async (id, uptadeTask) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, uptadeTask)
            setTask(task.map(t => t.id === id ? response.data : t))
        } catch (error) {
            console.log(error);

        }

    }

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`)
            setTask(task.filter(t => t.id !== id));
        } catch (error) {
            console.log(error);

        }
    }




    return (
        <TaskContext.Provider value={{ task, setTask, editTask,deleteTask }}>
            {children}
        </TaskContext.Provider>
    )

}