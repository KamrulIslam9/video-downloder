
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Allows cross-origin requests
app.use(express.json()); // Parses incoming JSON requests
app.use(express.static(path.join(__dirname, 'public'))); // Serves the static front-end files

// API Endpoint to process the video URL
app.post('/api/process-url', (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ status: 'error', message: 'Error: URL cannot be empty.' });
    }

    let platform = 'Unknown';
    let responseMessage = '';
    let status = 'error';

    // Platform detection logic
    if (url.includes("tiktok.com")) {
        platform = 'TikTok';
        status = 'error';
        responseMessage = 'Tik Tokers not allowed';
    } else if (url.includes("youtube.com") || url.includes("youtu.be")) {
        platform = 'YouTube';
        status = 'success';
        responseMessage = `Source locked. Preparing download from ${platform}.`;
    } else if (url.includes("instagram.com")) {
        platform = 'Instagram';
        status = 'success';
        responseMessage = `Source locked. Preparing download from ${platform}.`;
    } else if (url.includes("facebook.com") || url.includes("fb.watch")) {
        platform = 'Facebook';
        status = 'success';
        responseMessage = `Source locked. Preparing download from ${platform}.`;
    } else {
        responseMessage = 'Error: Unsupported platform or invalid URL.';
    }

    console.log(`Detected Platform: ${platform}, Status: ${status}`);
    
    // Send the response back to the front-end
    return res.json({ status, message: responseMessage, platform });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Vortex server is running on http://localhost:${PORT}`);
});
