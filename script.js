// Selecting elements
const getButton = document.getElementById("getLine");
const newButton = document.getElementById("new-quote");
const copyButton = document.getElementById("copy-quote");
const quoteText = document.getElementById("quote");

// API URL
const API_URL = "https://api.jcwyt.com/pickup";

// Event Listeners
getButton.addEventListener("click", fetchPickupLine);
newButton.addEventListener("click", fetchPickupLine);
copyButton.addEventListener("click", copyToClipboard);

/**
 * Fetch a random pickup line from the API
 */
function fetchPickupLine() {
    fetch(API_URL)
        .then(response => response.text()) // The API returns plain text
        .then(data => {
            console.log("API Response:", data); // Debugging
            if (data) {
                // Format pickup line
                const pickupLine = data.replace("{author}", "").replace("{answer}", "😉");
                quoteText.textContent = `"${pickupLine}"`;

                // Show "New" and "Copy" buttons
                newButton.classList.remove("hidden");
                copyButton.classList.remove("hidden");

                // Hide "Get" button after first click
                getButton.style.display = "none";
            } else {
                quoteText.textContent = `"Oops! No pickup line found."`;
            }
        })
        .catch(error => {
            console.error("Error fetching pickup line:", error);
            quoteText.textContent = `"Oops! Something went wrong."`;
        });
}

/**
 * Copy the current pickup line to the clipboard
 */
function copyToClipboard() {
    const textToCopy = quoteText.textContent.trim();
    
    if (textToCopy) {
        navigator.clipboard.writeText(textToCopy)
            .then(() => alert("Copied to clipboard! ✅"))
            .catch(err => console.error("Failed to copy: ", err));
    }
}

