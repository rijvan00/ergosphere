import { useState } from "react";
import Link from "next/link";
import router from "next/router";

export default function AddTask() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    deadline: "",
    category: "",
  });

  const [aiInput, setAiInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSaveTask = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          category: form.category,
          priority_score:
            form.priority === "high"
              ? 1.0
              : form.priority === "medium"
              ? 0.5
              : 0.1,
          deadline: form.deadline || null,
          status: "pending",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save task");
      }

      const data = await response.json();
      alert("✅ Task saved successfully!");

      // Reset form
      setForm({
        title: "",
        description: "",
        priority: "medium",
        deadline: "",
        category: "",
      });
      setAiInput("");
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to save task. Check console for details.");
    }
  };

  const getAISuggestion = async () => {
    if (!aiInput.trim()) return alert("Please enter what you want help with.");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/suggestions/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: aiInput }),
      });

      const data = await res.json();
      console.log("AI response:", data);

      let priorityStr = "medium";
      if (typeof data.priority === "string") {
        priorityStr = data.priority.toLowerCase();
      } else if (typeof data.priority_score === "number") {
        priorityStr =
          data.priority_score >= 0.8
            ? "high"
            : data.priority_score >= 0.5
            ? "medium"
            : "low";
      }

      setForm((prev) => ({
        ...prev,
        title: data.title || prev.title,
        category: data.category || prev.category,
        deadline: data.deadline || prev.deadline,
        priority: priorityStr,
        description: data.description || prev.description || aiInput, 
      }));
    } catch (err) {
      alert("Failed to get AI suggestion");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-gray-100 p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Add New Task</h1>

        {/* AI Input Field */}
        <div className="mb-6">
          <label className="block mb-1 text-sm font-semibold">
            Tell me what you're planning:
          </label>
          <textarea
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            className="w-full bg-black text-white p-2 rounded border border-gray-600 mb-2"
            placeholder="e.g. I have a meeting today and need to prepare slides first"
            rows={3}
          ></textarea>

          <button
            type="button"
            onClick={getAISuggestion}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Generating..." : "🧠 Get AI Suggestion"}
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4 bg-[#1a1a1a] p-6 rounded-lg border border-gray-700">
          <div>
            <label className="block mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full bg-black text-white p-2 rounded border border-gray-600"
            />
          </div>

          <div>
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full bg-black text-white p-2 rounded border border-gray-600"
              placeholder="Add optional details..."
            ></textarea>
          </div>

          <div>
            <label className="block mb-1">Priority</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full bg-black text-white p-2 rounded border border-gray-600"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              className="w-full bg-black text-white p-2 rounded border border-gray-600"
            />
          </div>

          <div>
            <label className="block mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full bg-black text-white p-2 rounded border border-gray-600"
              placeholder="e.g. Study, Work, Personal"
            />
          </div>

          <div className="flex justify-between mt-6">
            <Link href="/">
              <span className="text-sm underline hover:text-blue-400 cursor-pointer">
                ← Back to Dashboard
              </span>
            </Link>
            <button
              type="button"
              onClick={handleSaveTask}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
