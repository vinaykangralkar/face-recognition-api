const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const e = require('express');
const bcrypt = require('bcrypt-nodejs');
const register = require('./constrollers/register');
const signin = require('./constrollers/signin');
const profile = require('./constrollers/profile');
const image = require('./constrollers/image');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL, 
      ssl: true
    }
});

db.select('*').from('users');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'vinay',
            email: 'vinay@gmail.com',
            password: 'vinay',
            entries: 0,
            joined: new Date()
        },
        {
            id: '456',
            name: 'ravi',
            email: 'ravi@gmail.com',
            password: 'ravi',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.json('it is working');
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)}) 

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, () => {
    console.log("Cool!!!");
})