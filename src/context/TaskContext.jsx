import { createContext, useEffect, useState } from "react";
import axios from "axios"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TaskContext = createContext()

const API_URL = "http://localhost:3000/tasks"

export const TaskProvider = ({ children }) => {
    const [task, setTask] = useState(null);

    //receiving task information
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

    //task edit function

    const editTask = async (id, uptadeTask) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, uptadeTask)
            setTask(task.map(t => t.id === id ? response.data : t))
        } catch (error) {
            console.log(error);

        }

    }

    //task delete function
    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`)
            setTask(task.filter(t => t.id !== id));
        } catch (error) {
            console.log(error);

        }
    }

    const postTask = async (t) => {
        try {
            const response = await axios.post("http://localhost:3000/tasks", t)
            toast.success("Task added successfully!")
        } catch (error) {
            toast.error("Failed to add task!");
        }

    }


    return (
        <TaskContext.Provider value={{ task, setTask, editTask, deleteTask, postTask }}>
            {children}
        </TaskContext.Provider>
    )

}