require('dotenv').config();

const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, `.env.${process.env.NODE_ENV || 'development'}`) });

// CORS Configuration
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

// Parse incoming requests data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Variables for routes API
const apiUrl = process.env.API_URL;
const wakatimeApiUrl = 'https://wakatime.com/api/v1/users/current/stats';
const githubApiUrl = 'https://api.github.com';

// Middleware for API URL
app.use('/api', async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${apiUrl}${req.originalUrl.replace('/api', '')}`,
      headers: {
        "X-API-KEY": process.env.API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      data: req.body
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || {
      error: "Internal Server Error"
    });
  }
});

// Middleware for Wakatime API URL
app.use('/wakatime', async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: wakatimeApiUrl,
      headers: {
        Authorization: `Basic ${btoa(process.env.WAKATIME_API_KEY)}`,
        "Content-Type": "application/json",
      }
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || {
      error: "Internal Server Error"
    });
  }
});

// Middleware for Github API URL
app.use('/github', async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${githubApiUrl}${req.originalUrl.replace('/github', '')}`,
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      data: req.body
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || {
      error: "Internal Server Error"
    });
  }
});

app.post('/track-user', (req, res) => {
  const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];

  res.json({
    ip: ipAddress,
    user_agent: userAgent
  })
})

// Redirect to frontend URL if route not found
app.use((req, res) => {
  res.redirect(process.env.FRONTEND_URL);
});

// Listen to port
app.listen(port, () => {
  console.log(`Proxy API running on port ${process.env.BASE_URL}:${port}`);
});
