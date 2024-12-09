const express = require('express') //require oznacza import
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config() // kolejny import biblioteki z pliku .env
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');

const path = require('path');


const app = express() //wywołanie funkcji zaimportowanej
const port = process.env.PORT || 3000;

//middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

(async function main() {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@electrox.v1y4d.mongodb.net/Electrox?retryWrites=true&w=majority&appName=electrox`);
    console.log('Połączono z Mongo!!!');
  }
  catch (error) {
    console.error("Błąd w trakcie łączenia!!!", error);
  }
})();


app.get('/', (req, res) => {
  res.json('Serwer połączony!!!')
});


app.listen(port, () => {
  console.log(`Aplikacja obsługiwana na porcie ${port}`)
})

const userRoutes = require('./src/users/user.route');
app.use('/api/auth', userRoutes);

const itemRoutes = require('./src/items/item.route');
app.use('/api/items', itemRoutes);







