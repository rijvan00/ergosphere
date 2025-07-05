import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ToggleButton from "@/component/ToggleButton";

type Category = {
  id: number;
  name: string;
  usage_count: number;
};

type Task = {
  id: number;
  title: string;
  description: string;
  status: "completed" | "not completed" | "done" | "pending";
  priority: "low" | "medium" | "high";
  deadline: string;
  category: string | Category;
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filtered, setFiltered] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/tasks/");
        const text = await res.text();
        const rawData = JSON.parse(text);

        const dataWithPriority = rawData.map((task: any) => ({
          ...task,
          priority:
            task.priority_score >= 0.8
              ? "high"
              : task.priority_score >= 0.5
              ? "medium"
              : "low",
        }));

        setTasks(dataWithPriority);
        setFiltered(dataWithPriority);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    let result = [...tasks];

    if (search.trim()) {
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (priorityFilter !== "all") {
      result = result.filter((t) => t.priority === priorityFilter);
    }

    if (sortBy === "deadline") {
      result.sort((a, b) => a.deadline.localeCompare(b.deadline));
    } else if (sortBy === "priority") {
      const priorityRank = { high: 3, medium: 2, low: 1 };
      result.sort((a, b) => priorityRank[b.priority] - priorityRank[a.priority]);
    } else {
      result.sort((a, b) => b.id - a.id); // latest first
    }

    setFiltered(result);
  }, [search, priorityFilter, sortBy, tasks]);

  const toggleTaskStatus = async (taskId: number, currentStatus: string) => {
    const newStatus =
      currentStatus === "done" || currentStatus === "completed"
        ? "pending"
        : "done";

    try {
      const res = await fetch(`http://localhost:8000/api/tasks/${taskId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (err) {
      console.error("Status update failed:", err);
      alert("❌ Could not update task status");
    }
  };

  const handleDelete = async (taskId: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:8000/api/tasks/${taskId}/`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      alert("🗑️ Task deleted");
    } catch (err) {
      console.error("Delete failed", err);
      alert("❌ Failed to delete task");
    }
  };

  return (
<main className="min-h-screen bg-white dark:bg-[#0d0d0d] text-black dark:text-gray-100 p-6 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">SMART TO-DO</h1>
         <div className="absolute top-4 right-4">
            <ToggleButton />
          </div>
        {/* Controls */}
        <div className="flex flex-wrap gap-3 justify-between mb-6">
          <input
            type="text"
            placeholder="🔍 Search by title or description"
            className="flex-1 bg-black border border-gray-700 p-2 rounded text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-black border border-gray-700 p-2 rounded text-white"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-black border border-gray-700 p-2 rounded text-white"
          >
            <option value="latest">Newest First</option>
            <option value="deadline">Earliest Deadline</option>
            <option value="priority">Priority High → Low</option>
          </select>
        </div>

        <div className="flex justify-end mb-4">
          <button
            className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-800 transition"
            onClick={() => router.push("/task")}
          >
            + Add Task
          </button>
        </div>

        {/* Task List */}
        {loading ? (
          <p className="text-center">Loading tasks...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-400">No tasks found.</p>
        ) : (
          <div className="space-y-4">
            {filtered.map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-lg border bg-[#1a1a1a] border-gray-700 space-y-2"
              >
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-semibold text-gray-300">{task.title}</h2>
                  <span
                    className={`font-bold ${
                      task.priority === "high"
                        ? "text-red-400"
                        : task.priority === "medium"
                        ? "text-yellow-300"
                        : "text-green-400"
                    }`}
                  >
                    {task.priority.charAt(0).toUpperCase() +
                      task.priority.slice(1)}
                  </span>
                </div>

                {task.description && (
                  <p className="text-sm text-gray-300 italic">
                    📝 {task.description}
                  </p>
                )}

                {task.category && (
                  <p className="text-sm text-blue-300">
                    📂 Category:{" "}
                    {typeof task.category === "object"
                      ? task.category.name
                      : task.category}
                  </p>
                )}

                <p className="text-sm text-gray-300">📅 Deadline: {task.deadline}</p>

                <div className="flex justify-between items-center">
                  <p
                    className={`text-sm ${
                      task.status === "completed" || task.status === "done"
                        ? "text-green-400 line-through"
                        : "text-red-400"
                    }`}
                  >
                    {task.status === "completed" || task.status === "done"
                      ? "✅ Completed"
                      : "❌ Not Completed"}
                  </p>

                  <button
                    onClick={() => toggleTaskStatus(task.id, task.status)}
                    className="text-sm px-2 py-1 border border-gray-600 rounded hover:bg-gray-700 transition text-gray-300 "
                  >
                    {task.status === "done" || task.status === "completed"
                      ? "Undo"
                      : "Mark Done"}
                  </button>
                </div>

                <div className="flex gap-4 pt-2 text-sm">
                  <button
                    onClick={() => router.push(`/task/${task.id}`)}
                    className="text-blue-400 hover:underline"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-400 hover:underline"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
