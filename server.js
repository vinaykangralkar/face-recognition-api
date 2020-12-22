const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : '',
      password : '',
      database : 'face-recognition'
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
    res.json(database.users);
})

app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email && 
    req.body.password === database.users[0].password){
        res.json(database.users[0]);
    }else{
        res.status(400).json('Error');
    }
})

app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    db('users').returning('*').insert({
        name: name,
        email: email,
        joined: new Date()
    }).then(user => {
        res.json(user[0]);
    }).catch(error => res.status(400).json('Unable to register.'))
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;

    db.select('*').from('users').where({id})
    .then(user => {
        if(user.length){
            res.json(user[0])
        }else{
            res.status(400).json('Not found')
        }
    })
    .catch(error => res.status(400).json('Error getting user'));
}) 

app.put('/image', (req, res) => {
    const {id} = req.body;
    
    db('users').where('id', '=', id).increment('entries', 1).returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(error => res.status(400).json('unable to get entries'))
})

app.listen(3000, () => {
    console.log("Cool!!!");
})