const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const weatherRoutes = require('./routes/weather');


const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/weather', weatherRoutes);


app.get('/', (req, res) => res.json({ ok: true, name: 'WeatherWise' }));


module.exports = app;