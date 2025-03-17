require('dotenv').config();

const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiUrl = 'https://be.fahrianggara.my.id/api';
const wakatimeApiUrl = 'https://wakatime.com/api/v1/users/current/stats';

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

app.use('/wakatime-api', async (req, res) => {
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

app.listen(port, () => {
  console.log(`Proxy API running on port ${port}`);
});
