const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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
    database.users.push({
        id: '234',
        name,
        email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    let found = false;

    database.users.forEach((user) => {
        if(user.id === id){
            found = true;
            res.json(user);
        }
    })
    if(!found){
        res.status(404).json("No user");
    }
}) 

app.put('/image', (req, res) => {
    const {id} = req.body;
    let found = false;

    database.users.forEach((user) => {
        if(user.id === id){
            found = true;
            user.entries++;
            res.json(user.entries);
        }
    })
    if(!found){
        res.status(404).json("No user");
    }
})

app.listen(3000, () => {
    console.log("Cool!!!");
})