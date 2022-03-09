const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');

const port = process.env.PORT || 3000;

app.options('*', cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
  next()
});

app.get('/', async (req, res) => {
    try {
        let info = {
            method: 'get',
            url: 'https://api.weatherapi.com/v1/forecast.json?key=3738897fde7047f0a1822737203011&q=20171&days=1'
        }
        let response = await axios(info);
        let forecast = [];
        for (prop of response.data.forecast.forecastday[0].hour) {
            forecast.push({time: prop.time, temp_f: prop.temp_f});
        }
        res.send({
            current: {
                temp_f: response.data.current.temp_f
            },
            forecast: forecast
        });
    } catch (e) {
        console.log('error', e);
        res.status(500).send({
            Error: e.message
        });
    }
  });

app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);