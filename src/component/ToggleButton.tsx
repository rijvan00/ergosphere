import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

export default function ToggleButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="text-sm px-3 py-1 border border-gray-600 rounded hover:bg-gray-800 transition"
    >
      {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
