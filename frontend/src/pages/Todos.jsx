import React, { useState, useEffect } from "react";
import { addTodo, getTodos, updateTodos, deleteTodo, logoutUser } from "../api";
import { useNavigate } from "react-router-dom";

function Todos() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState("");
  const [completedCount, setCompletedCount] = useState(0);

  async function getData() {
    const data = await getTodos();
    setTodos(data);
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

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const progress = todos.length > 0 ? (completedCount / todos.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 shadow-lg">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Tasks</h1>
              <p className="text-blue-100">{todos.length === 0 ? "No tasks yet" : completedCount === todos.length ? "All tasks completed!" : `${todos.length - completedCount} remaining`}</p>
            </div>
            <button onClick={handleLogout} className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition">Logout</button>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 mb-8 border border-slate-700 shadow-lg">
          <form onSubmit={handleTodoAdd} className="flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 px-4 py-3 rounded-xl bg-slate-700 text-white placeholder-slate-500 outline-none border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition" placeholder="Add a new task..." />
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition" type="submit">Add</button>
          </form>
        </div>

        {todos.length > 0 && (
          <div className="mb-8 bg-slate-800 rounded-2xl p-4 border border-slate-700">
            <div className="flex justify-between text-sm text-slate-300 mb-2"><span>Progress</span><span>{completedCount}/{todos.length}</span></div>
            <div className="w-full bg-slate-700 rounded-full h-2"><div className="bg-linear-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all" style={{width: `${progress}%`}}></div></div>
          </div>
        )}

        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12 bg-slate-800 rounded-2xl border border-slate-700"><p className="text-slate-400">No tasks yet. Create one to get started!</p></div>
          ) : (
            todos.map((todo) => (
              <div key={todo.id} className={`flex items-center gap-4 p-4 rounded-xl border transition ${todo.completed ? "bg-slate-800 border-slate-700 opacity-60" : "bg-slate-800 border-slate-700 hover:border-blue-500 hover:bg-slate-700"}`}>
                <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id, todo.completed)} className="w-5 h-5 cursor-pointer accent-blue-500" />
                <span className={`flex-1 text-lg ${todo.completed ? "line-through text-slate-500" : "text-white"}`}>{todo.text}</span>
                <button onClick={() => removeTodo(todo.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg></button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Todos;
