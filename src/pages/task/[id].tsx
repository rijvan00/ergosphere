import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditTask() {
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    deadline: "",
    category: "",
  });

  const [loading, setLoading] = useState(true);

  const fetchTask = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/tasks/${id}/`);
      const task = await res.json();
      setForm({
        title: task.title || "",
        description: task.description || "",
        priority:
          task.priority_score >= 0.8
            ? "high"
            : task.priority_score >= 0.5
            ? "medium"
            : "low",
        deadline: task.deadline || "",
        category: typeof task.category === "object" ? task.category.name : task.category,
      });
    } catch (err) {
      console.error("Error loading task:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchTask();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/tasks/${id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          priority_score: form.priority === "high" ? 1 : form.priority === "medium" ? 0.5 : 0.1,
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      alert("✅ Task updated successfully");
      router.push("/");
    } catch (err) {
      alert("❌ Failed to update task");
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Edit Task</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <form className="space-y-4 bg-[#1a1a1a] border border-gray-700 p-6 rounded">
            <div>
              <label className="block mb-1">Title</label>
              <input name="title" value={form.title} onChange={handleChange} className="w-full bg-black text-white p-2 rounded border border-gray-600" />
            </div>

            <div>
              <label className="block mb-1">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} className="w-full bg-black text-white p-2 rounded border border-gray-600" />
            </div>

            <div>
              <label className="block mb-1">Priority</label>
              <select name="priority" value={form.priority} onChange={handleChange} className="w-full bg-black text-white p-2 rounded border border-gray-600">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">Deadline</label>
              <input type="date" name="deadline" value={form.deadline} onChange={handleChange} className="w-full bg-black text-white p-2 rounded border border-gray-600" />
            </div>

            <div>
              <label className="block mb-1">Category</label>
              <input name="category" value={form.category} onChange={handleChange} className="w-full bg-black text-white p-2 rounded border border-gray-600" />
            </div>

            <button type="button" onClick={handleUpdate} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
              Save Changes
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
