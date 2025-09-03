import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from "./components/Navbar"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import './App.css'
import TaskForm from './components/TaskForm';

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/task-form" element={<TaskForm />} />
      </Routes>
    </div>

  )
}

export default App
