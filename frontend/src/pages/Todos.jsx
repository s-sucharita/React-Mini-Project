import React, { useState, useEffect } from "react";
import { addTodo, getTodos, updateTodos, deleteTodo, logoutUser } from "../api";
import { useNavigate } from "react-router-dom";

function Todos() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState("");
  const [completedCount, setCompletedCount] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [loading, setLoading] = useState(true);

  async function getData() {
    try {
      setLoading(true);
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const name = localStorage.getItem("name");
    setUserName(name);
    getData();
  }, []);

  useEffect(() => {
    const completed = todos.filter((todo) => todo.completed).length;
    setCompletedCount(completed);
  }, [todos]);

  const handleTodoAdd = async (e) => {
    try {
      e.preventDefault();
      if (input.trim() === "") return;
      await addTodo(input);
      setInput("");
      getData();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      await updateTodos(id, !completed);
      getData();
    } catch (error) {
      console.log("Error updating todo:", error);
    }
  };

  const removeTodo = async (id) => {
    try {
      await deleteTodo(id);
      getData();
    } catch (error) {
      console.log("Error deleting todo:", error);
    }
  };

  const startEditing = (id, currentText) => {
    setEditingId(id);
    setEditingText(currentText);
  };

  const saveEdit = async () => {
    if (editingText.trim() === "") return;
    try {
      await updateTodos(editingId, undefined, editingText);
      setEditingId(null);
      setEditingText("");
      getData();
    } catch (error) {
      console.log("Error updating todo:", error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const progress = todos.length > 0 ? (completedCount / todos.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-2xl"></div>
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-pink-500/8 rounded-full blur-xl animate-bounce" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-cyan-500/8 rounded-full blur-xl animate-bounce" style={{animationDelay: '3s'}}></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 mb-8 shadow-2xl fade-in relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>

          <div className="flex items-center justify-between flex-wrap gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  My Tasks
                </h1>
                <p className="text-blue-100 text-lg">
                  {todos.length === 0 ? "Ready to organize your day!" : completedCount === todos.length ? "🎉 All tasks completed!" : `${todos.length - completedCount} tasks remaining`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-blue-100 text-sm">Welcome back</p>
                <p className="text-white font-semibold">{userName}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-sm hover:shadow-lg transform hover:scale-105 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Add Todo Form */}
        <div className="bg-slate-800/60 backdrop-blur-xl rounded-3xl p-8 mb-8 border border-slate-700/50 shadow-2xl fade-in relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-indigo-500/15 to-pink-500/15 rounded-full blur-lg"></div>

          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              Add New Task
            </h2>

            <form onSubmit={handleTodoAdd} className="flex gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full px-6 py-4 pl-14 rounded-2xl bg-slate-700/50 text-white placeholder-slate-400 outline-none border border-slate-600/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm hover:bg-slate-700/70 text-lg"
                  placeholder="What needs to be done today?"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
              </div>
              <button
                className="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 rounded-2xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 flex items-center gap-3 text-lg"
                type="submit"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Add Task
              </button>
            </form>
          </div>
        </div>

        {/* Stats Section */}
        {todos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-6 border border-blue-500/20 shadow-xl animate-slide-in-left">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-2xl">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-blue-400 text-sm font-medium">Completed</p>
                  <p className="text-white text-2xl font-bold">{completedCount}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-xl rounded-3xl p-6 border border-orange-500/20 shadow-xl animate-slide-in-up" style={{animationDelay: '0.1s'}}>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-500/20 rounded-2xl">
                  <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-orange-400 text-sm font-medium">Pending</p>
                  <p className="text-white text-2xl font-bold">{todos.length - completedCount}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-3xl p-6 border border-green-500/20 shadow-xl animate-slide-in-left" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/20 rounded-2xl">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <p className="text-green-400 text-sm font-medium">Progress</p>
                  <p className="text-white text-2xl font-bold">{Math.round(progress)}%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Motivational Quote */}
        <div className="bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-8 border border-indigo-500/20 shadow-xl animate-scale-in mb-8">
          <div className="text-center">
            <div className="inline-block p-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl mb-4">
              <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <blockquote className="text-xl text-white font-medium mb-2 italic">
              "The secret of your future is hidden in your daily routine."
            </blockquote>
            <cite className="text-indigo-400 text-sm">— Mike Murdock</cite>
          </div>
        </div>

        {/* Todo List */}
        <div className="space-y-4">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-slate-800/60 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50 shadow-2xl animate-pulse">
                <div className="flex items-center gap-6">
                  <div className="w-7 h-7 bg-slate-600 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-slate-600 rounded-lg mb-2"></div>
                    <div className="h-4 bg-slate-600 rounded w-3/4"></div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-12 h-12 bg-slate-600 rounded-2xl"></div>
                    <div className="w-12 h-12 bg-slate-600 rounded-2xl"></div>
                  </div>
                </div>
              </div>
            ))
          ) : todos.length === 0 ? (
            <div className="text-center py-16 bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl fade-in relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-500/8 to-pink-500/8 rounded-full blur-xl"></div>

              <div className="relative z-10">
                <div className="inline-block p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl mb-6">
                  <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">No Tasks Yet</h3>
                <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">Start your productive journey by adding your first task above. Let's get things done! 🚀</p>
                <div className="flex justify-center">
                  <div className="animate-bounce">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            todos.map((todo, index) => (
              <div
                key={todo.id}
                className={`group flex items-center gap-6 p-6 rounded-3xl border transition-all duration-500 fade-in backdrop-blur-xl hover:shadow-2xl transform hover:scale-[1.02] ${
                  todo.completed
                    ? "bg-slate-800/40 border-slate-700/50 opacity-75 hover:opacity-90"
                    : "bg-slate-800/60 border-slate-700/50 hover:border-blue-400/50 hover:bg-slate-700/60"
                }`}
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id, todo.completed)}
                    className="w-7 h-7 cursor-pointer accent-green-500 rounded-lg border-2 border-slate-500 focus:ring-2 focus:ring-green-500/50 transition-all duration-300"
                  />
                  {todo.completed && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>

                {editingId === todo.id ? (
                  <div className="flex-1 flex items-center gap-4">
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="flex-1 px-4 py-3 bg-slate-600/60 rounded-2xl text-white placeholder-slate-400 border border-slate-500 focus:border-blue-400 outline-none transition-all duration-300 backdrop-blur-sm text-lg"
                      autoFocus
                    />
                    <button
                      onClick={saveEdit}
                      className="p-3 text-green-400 hover:bg-green-500/20 rounded-2xl transition-all duration-300 hover:scale-110"
                      title="Save"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="p-3 text-red-400 hover:bg-red-500/20 rounded-2xl transition-all duration-300 hover:scale-110"
                      title="Cancel"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <>
                    <span className={`flex-1 text-xl transition-all duration-300 ${
                      todo.completed ? "line-through text-slate-500" : "text-white"
                    }`}>
                      {todo.text}
                    </span>

                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <button
                        onClick={() => startEditing(todo.id, todo.text)}
                        className="p-3 text-blue-400 hover:bg-blue-500/20 rounded-2xl transition-all duration-300 hover:scale-110"
                        title="Edit"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>

                      <button
                        onClick={() => removeTodo(todo.id)}
                        className="p-3 text-red-400 hover:bg-red-500/20 rounded-2xl transition-all duration-300 hover:scale-110"
                        title="Delete"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Todos;
