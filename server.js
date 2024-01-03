const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Define the endpoint on your server
const SERVER_ENDPOINT = '/upload';

// Define the destination API endpoint (ngrok in this case)
const NGROK_API_ENDPOINT = 'https://9f81-196-219-57-238.ngrok-free.app';
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());

// Middleware to forward requests
app.post(SERVER_ENDPOINT, async (req, res) => {
  try {
    const body  = req.body;

    // Make the request to the destination API (ngrok)
    const response = await axios({
      method: 'post',
      url: `${NGROK_API_ENDPOINT}${SERVER_ENDPOINT}`,
      data: body,
    });

    // Forward the response back to the client
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error forwarding request:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/test', (req, res) => {
  res.json({message: 'Server running!'});
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
