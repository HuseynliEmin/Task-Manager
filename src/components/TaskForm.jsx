import React, { useContext, useState } from 'react'
import { TaskContext } from '../context/TaskContext'

const TaskForm = () => {
  const { postTask } = useContext(TaskContext)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault()

    const newTask = {
      title,
      description,
      completed
    }
    postTask(newTask)

    setTitle("");
    setDescription("");
    setCompleted(false)
  
  }

  return (
    <div className="container mt-4">
      <div className="card mx-auto" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title:</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description:</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
                required
              ></textarea>
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="completedCheck">
                Completed
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>


  )
}

export default TaskForm