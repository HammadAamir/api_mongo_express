require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');

app = express()

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
.then(() =>  console.log('connection successful'))
.catch((err) => console.error(err));

// const db = mongoose.connection
// db.on('error', (err) => console.error(`Error: ${err}`));
// db.once('open', () => console.log('Database connection started'));

app.use(express.json())

app.use('/api/mobiles', require('./routes/api/mobiles'))

app.listen(3000, () => console.log("Server started"));