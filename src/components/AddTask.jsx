import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { api } from "../../static";
import { toast } from "react-toastify";

const scheduleOptions = [
  { value: "0 9 * * *", label: "Every day at 9 AM" },
  { value: "0 12 * * 1-5", label: "Weekdays at 12 PM" },
  { value: "0 0 * * 0", label: "Every Sunday at midnight" },
  { value: "*/30 * * * *", label: "Every 30 minutes" },
  // Add more options as needed
];

const AddTask = () => {
  const [taskName, setTaskName] = useState("");
  const [schedule, setSchedule] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${api}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskName,
          schedule,
          email,
        }),
      });
      toast.success(res.message);
      //   reset
      setTaskName("");
      setSchedule("");
      setEmail("");
      navigate("/");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Add New Task
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-700">
            Task Name:
          </label>
          <textarea
            autoFocus
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-700">
            Schedule:
          </label>
          <select
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            <option value="" disabled>
              Select a schedule
            </option>
            {scheduleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 transition duration-150 ease-in-out"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
