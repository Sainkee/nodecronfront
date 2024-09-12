import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../static";

const TaskLogs = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${api}/tasks`);
        if (Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setTasks([]); // Set an empty array if the format is not as expected
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Failed to fetch tasks");
        setTasks([]); // Set an empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${api}/tasks/${taskId}`);
      // Remove the task from the state
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Failed to delete task");
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Scheduled Tasks</h1>
      {tasks.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Task ID</th>
              <th className="border px-4 py-2">Task Name</th>
              <th className="border px-4 py-2">Frequency</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Created At</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td className="border px-4 py-2">{task._id}</td>
                <td className="border px-4 py-2">{task.taskName}</td>
                <td className="border px-4 py-2">{task.frequency}</td>
                <td className="border px-4 py-2">{task.email}</td>
                <td className="border px-4 py-2">
                  {new Date(task.createdAt).toLocaleString()}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No tasks available.</div>
      )}
    </div>
  );
};

export default TaskLogs;
