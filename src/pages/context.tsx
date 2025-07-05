import { useState } from "react";
import Link from "next/link";

export default function ContextInput() {
  const [form, setForm] = useState({
    source: "note",
    content: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.content.trim()) return alert("Content is required");

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/contexts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to submit context");

      alert("✅ Context saved successfully!");
      setForm({ source: "note", content: "" });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save context");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Add Context Entry</h1>

        <div className="space-y-4 bg-[#1a1a1a] border border-gray-700 p-6 rounded-lg">
          <div>
            <label className="block mb-1 font-semibold">Source</label>
            <select
              name="source"
              value={form.source}
              onChange={handleChange}
              className="w-full p-2 bg-black border border-gray-600 rounded"
            >
              <option value="note">Note</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="email">Email</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Content</label>
            <textarea
              name="content"
              rows={4}
              value={form.content}
              onChange={handleChange}
              className="w-full p-2 bg-black border border-gray-600 rounded text-white"
              placeholder="Paste your message, note or email here..."
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
          >
            {loading ? "Saving..." : "Save Context"}
          </button>
        </div>

        <Link href="/" className="block mt-4 text-blue-400 underline">
          ← Back to Dashboard
        </Link>
      </div>
    </main>
  );
}
