require('dotenv').config();

const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiUrl = 'https://be.fahrianggara.my.id/api';

app.use('/', async (req, res) => {
  console.log(req.method, req.originalUrl, req.body); // Log request body

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

    console.log(response.status, response.data);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error.response?.status, error.response?.data);
    res.status(error.response?.status || 500).json(error.response?.data || { 
      error: "Internal Server Error" 
    });
  }
});

app.listen(port, () => {
  console.log(`Proxy API running on port ${port}`);
});
