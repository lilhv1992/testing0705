const express = require('express');
const { json } = require('body-parser');
const { User } = require('./models/user.model');

const app = express();
app.use(json());

app.get('/user', (req, res) => {
    User.find({})
    .then(users => res.send({ success: true, users }));
});

app.post('/user/signup', (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    user.save()
    .then(() => res.send({ success: true, user }))
    .catch(error => res.send({ success: false, message: error.message }));
});

app.post('/user/signin', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email, password })
    .then(user => {
        if (!user) throw new Error('Invalid user info');
        res.send({ success: true, user });
    })
    .catch(error => res.send({ success: false, message: error.message }));
});

module.exports = { app };

// npm intellisense
// path intellisense
