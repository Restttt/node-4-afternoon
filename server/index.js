require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');

const { SERVER_PORT, SERVER_SECRET } = process.env;

const checkForSession = require('./middlewares/checkForSession.js');

const swagController = require('./controllers/swagController');
const authController = require('./controllers/authController.js');
const cartController = require('./controllers/cartController');
const searchController = require('./controllers/searchController');

app.use(express.json());
app.use(session({
    secret: SERVER_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));
app.use(checkForSession);

app.get('/api/swag', swagController.read);

app.get('/api/user', authController.getUser);
app.post('/api/login', authController.login);
app.post('/api/register', authController.register);
app.post('/api/signout/', authController.signout);

app.post('/api/cart/checkout', cartController.checkout);
app.post('/api/cart/', cartController.add);
app.delete('/api/cart/', cartController.delete);

app.get('/api/search', searchController.search);



app.listen(SERVER_PORT, () => console.log(`we are listening at port: ${SERVER_PORT}`));