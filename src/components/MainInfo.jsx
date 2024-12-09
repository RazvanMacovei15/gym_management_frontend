import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTaskModal from "./AddTaskModal";
import { useAuth } from "./AuthProvider";
import Task from "./Task";

export default function MainInfo() {
  const { authState } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch tasks from API
  const fetchTasksData = async () => {
    try {
      setLoading(true);

      const config = {
        headers: { Authorization: `Bearer ${authState.authToken}` }
      };
      const response = await axios.get("http://maco-coding.go.ro:8010/tasks/all", config);
      setTasks(response.data);
      console.log(tasks);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setError("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRolesData = async () => {
    try {
      setLoading(true);

      const config = {
        headers: { Authorization: `Bearer ${authState.authToken}` }
      };
      const response = await axios.get("http://maco-coding.go.ro:8010/api/enum/roles", config);
      console.log(response.data);
    } catch (err) {
      console.error("Failed to fetch roles:", err);
      setError("Failed to fetch roles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasksData();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddTask = async (newTask) => {
    try {
      const response = await axios.post("http://maco-coding.go.ro:8010/tasks/create", newTask);
      console.log("Task added successfully:", response.data);
      fetchTasksData(); // Refresh task list
      toggleModal(); // Close modal
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  return (
    <div className="bg-[#455271] h-full rounded-xl m-1 p-4">
      <h2 className="text-5xl font-bold m-10 text-left ml-7" onClick={()=>{
        console.log(authState.authToken);
        fetchRolesData();
      }}>TASKS</h2>
      {loading ? (
        <p className="text-white text-center">Loading tasks...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="space-y-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <Task
                key={task.taskId} 
                id={task.taskDTO.taskId}
                title={"TITLU FOARTE INTERESANT"}
                creator={task.taskDTO.creator}
                category={task.taskDTO.category}
                description={task.taskDTO.description}
                subcategory={task.taskDTO.subcategory}
                priority={task.taskDTO.priority}
                deadline={task.taskDTO.deadline}
                gyms={task.gyms}
                users={task.users}
              />
            ))
          ) : (
            <p className="text-white text-center">No tasks available</p> // Handle empty tasks list
         )}
        </div>
      )}

      {/* "+" Button */}
      <button
        onClick={toggleModal}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
      >
        +
      </button>

      {/* Modal */}
      {isModalOpen && (
        <AddTaskModal onSubmit={handleAddTask} onClose={toggleModal} />
      )}
    </div>
  );
}
