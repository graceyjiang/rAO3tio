
// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode"); // Toggle dark mode class

    // Save the user's preference in localStorage
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
}

// Check localStorage on page load to apply the saved mode
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
}

// Event listener for button click
document.getElementById("toggleDarkMode").addEventListener("click", toggleDarkMode);
