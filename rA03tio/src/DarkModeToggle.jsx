import { useEffect, useState } from "react";
import React from "react";

function DarkModeToggle() {
  // Check localStorage and set the initial state based on that
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "enabled";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode"); // adds dark-mode class to body
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]); // Dependency array: React will re-run the effect when darkMode changes

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    const isEnabled = !darkMode;
    setDarkMode(isEnabled);

    // Save the user's preference in localStorage
    if (isEnabled) {
      localStorage.setItem("darkMode", "enabled");
    } else {
      localStorage.setItem("darkMode", "disabled");
    }
  };

  return (
    // <button id="toggleDarkMode" onClick={toggleDarkMode}>
    //   Dark Mode
    //   {/* {darkMode ? "Disable Dark Mode" : "Enable Dark Mode"} */}
    // </button>

    <div id="toggleDarkMode">
      <input
        type="checkbox"
        class="checkbox"
        id="checkbox"
        onChange={toggleDarkMode}
      />
      <label for="checkbox" class="checkbox-label">
        <span class="ball"></span>
      </label>
    </div>
  );
}

export default DarkModeToggle;
