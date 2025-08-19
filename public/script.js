// Get references to the DOM elements
const urlInput = document.getElementById('videoUrl');
const downloadBtn = document.getElementById('downloadBtn');
const messageArea = document.getElementById('message');

// The URL of our backend server API
const API_ENDPOINT = 'https://replit.com/@jisan143/video-downloder';

// Add an event listener to the download button
downloadBtn.addEventListener('click', handleDownloadRequest);

/**
 * Sends the URL to the backend for processing.
 */
async function handleDownloadRequest() {
    const url = urlInput.value.trim();

    if (!url) {
        showMessage("Error: Data stream URL cannot be empty.", "error");
        return;
    }
    
    // Show an initial "processing" message
    showMessage("Contacting neural hub...", "info");

    try {
        // Use the fetch API to send a POST request to our server
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url }),
        });

        if (!response.ok) {
            throw new Error('Server responded with an error.');
        }

        const data = await response.json();

        // Display the message from the server
        const isTikTok = data.platform === 'TikTok';
        showMessage(data.message, data.status, isTikTok);

    } catch (error) {
        console.error("Fetch error:", error);
        showMessage("Connection to server failed. Please check console.", "error");
    }
}

/**
 * Displays a message to the user.
 * @param {string} text The message to display.
 * @param {string} type The message type ('info', 'success', 'error').
 * @param {boolean} addGlitch Adds a glitch effect for the error message.
 */
function showMessage(text, type, addGlitch = false) {
    messageArea.textContent = text;
    messageArea.className = `message-area ${type}`; // Reset classes

    if (addGlitch) {
        messageArea.classList.add('glitch');
        messageArea.setAttribute('data-text', text);
    }
  }
