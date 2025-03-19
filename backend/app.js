require('dotenv').config();

const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: path.resolve(__dirname, envFile) });

app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiUrl = 'https://be.fahrianggara.my.id/api';
const wakatimeApiUrl = 'https://wakatime.com/api/v1/users/current/stats';
const githubApiUrl = 'https://api.github.com';

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

app.use((req, res) => {
  res.redirect(process.env.FRONTEND_URL);
});

app.listen(port, () => {
  console.log(`Proxy API running on port ${process.env.BASE_URL}:${port}`);
});
