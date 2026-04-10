import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API = "https://task-analyser-75tk.onrender.com";
   
  // fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API, { withCredentials: true });
      setTasks(res.data.tasks || []);
    } catch (err) {
      setError("could not load tasks"|err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // add task
  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await axios.post(API, { title }, { withCredentials: true });

      setTasks((prev) => [...prev, res.data.task]);
      setTitle("");
    } catch {
      setError("failed to add task");
    }
  };

  // toggle
  const toggleTask = async (id) => {
    try {
      const res = await axios.patch(
        `${API}/${id}`,
        {},
        { withCredentials: true },
      );

      setTasks((prev) => prev.map((t) => (t.id === id ? res.data.task : t)));
    } catch {
      setError("update failed");
    }
  };

  // delete
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/${id}`, { withCredentials: true });

      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError("delete failed");
    }
    };
    
    const navigate = useNavigate();

    const handleLogout = async () => {
      try {
        await axios.post(
          "https://task-analyser-75tk.onrender.com/logout",
          {},
          { withCredentials: true },
        );

        navigate("/");
      } catch {
        setError("logout failed");
      }
    };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white px-6 py-10">
      {/* header */}
      <div className="max-w-4xl mx-auto mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-xl tracking-tight font-medium">task.log</h1>
          <p className="text-xs text-gray-500 mt-1">
            keep it simple. keep it moving.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="text-xs border border-gray-700 px-3 py-1 hover:border-red-400 hover:text-red-400 transition"
        >
          logout
        </button>
      </div>

      {/* input */}
      <div className="max-w-4xl mx-auto mb-8">
        <form
          onSubmit={addTask}
          className="flex items-end gap-4 border-b border-gray-800 pb-3"
        >
          <input
            type="text"
            placeholder="write something you need to do..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm placeholder-gray-600"
          />
          <button
            type="submit"
            className="text-xs border border-gray-700 px-3 py-1 hover:border-white transition"
          >
            add
          </button>
        </form>
      </div>

      {/* states */}
      <div className="max-w-4xl mx-auto">
        {loading && <p className="text-xs text-gray-500">loading tasks...</p>}

        {error && <p className="text-xs text-red-400 mb-3">{error}</p>}

        {!loading && tasks.length === 0 && (
          <p className="text-xs text-gray-600">no tasks yet</p>
        )}
      </div>

      {/* list */}
      <div className="max-w-4xl mx-auto mt-6 space-y-3">
        {tasks.map((task, index) => (
          <div
            key={task?.id}
            className={`flex items-center justify-between border border-gray-800 px-5 py-4 
    ${index % 2 === 0 ? "translate-x-1" : "-translate-x-1"}`}
          >
            {/* left */}
            <div className="flex items-center gap-4">
              {/* checkbox */}
              <input
                type="checkbox"
                checked={task?.completed}
                onChange={() => toggleTask(task?.id)}
                className="w-4 h-4 accent-green-500 cursor-pointer"
              />

              {/* title + status */}
              <div className="flex flex-col">
                <p
                  className={`text-[15px] leading-snug ${
                    task?.completed
                      ? "line-through text-gray-500"
                      : "text-gray-200"
                  }`}
                >
                  {task?.title}
                </p>

                {/* status */}
                <span
                  className={`text-[11px] mt-1 px-2 py-[2px] w-fit border 
    ${
      task?.completed
        ? "border-green-500 text-green-400"
        : "border-yellow-500 text-yellow-400"
    }`}
                >
                  {task?.completed ? "completed" : "pending"}
                </span>

                {/* 🆕 timestamp */}
                <span className="text-[10px] text-gray-600 mt-1">
                  {task?.createdAt
                    ? new Date(task.createdAt).toLocaleString()
                    : ""}
                </span>
              </div>
            </div>

            {/* right */}
            <button
              onClick={() => deleteTask(task?.id)}
              className="text-xs text-gray-500 hover:text-red-400 transition"
            >
              remove
            </button>
          </div>
        ))}
      </div>

      {/* footer */}
      <div className="max-w-4xl mx-auto mt-16 text-xs text-gray-700">
        {tasks?.length} item{tasks.length !== 1 && "s"} tracked
      </div>
    </div>
  );
}
