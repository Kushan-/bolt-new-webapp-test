import React, { useState } from 'react';
import { ArrowLeft, Plus, LogOut } from 'lucide-react';

interface DashboardProps {
  onBack: () => void;
}

function Dashboard({ onBack }: DashboardProps) {
  const [tasks, setTasks] = useState([
    'Finish homework',
    'Call John',
    'Buy groceries'
  ]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
      setNewTask('');
    }
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-light-blue px-4 py-8">
      <div className="w-full max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-8 flex items-center text-white/80 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>

        {/* Dashboard Container */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-light-blue-600 mb-2">
              Your Tasks
            </h1>
          </div>

          {/* Task List */}
          <div className="mb-8">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <ul className="space-y-4">
                {tasks.map((task, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-light-blue-600 font-semibold mr-3 text-lg">
                      {index + 1}.
                    </span>
                    <span className="text-gray-700 font-medium text-lg">
                      {task}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Add New Task Form */}
          <form onSubmit={handleAddTask} className="mb-8">
            <div className="mb-4">
              <label 
                htmlFor="newTask" 
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                New Task
              </label>
              <input
                type="text"
                id="newTask"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-light-blue-500 focus:outline-none transition-colors duration-200 text-gray-700 font-medium placeholder-gray-400"
                placeholder="Enter a new task..."
              />
            </div>

            {/* Add Task Button */}
            <button
              type="submit"
              className="w-full bg-gradient-button text-white font-semibold text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-transparent hover:border-white/20 flex items-center justify-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Task
            </button>
          </form>

          {/* Logout Button */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full bg-white text-gray-600 font-semibold text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-gray-200 hover:border-gray-300 hover:text-gray-700 flex items-center justify-center"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;