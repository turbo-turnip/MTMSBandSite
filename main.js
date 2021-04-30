const express = require('express');
const app = express();
const { writeFile, readFile } = require('fs');
const { verify, sign } = require('jsonwebtoken');
const {} = require('dotenv').config();
const { compare, hash } = require('bcrypt');

app.use(express.json({ limit: '1MB' }));
 
app.post('/login', (req, res) => {
    const { name, pass } = req.body;
    readFile("database/users.json", (e, data) => {
        const users = JSON.parse(data);
        const user = users.filter(account => account.name === name);
        if (user[0])
            compare(pass, user[0].pass, (e, matches) => {
                if (matches) {
                    const token = sign({ name, pass }, process.env.ACCESS_TOKEN_SECRET);
                    token && res.json({ status: 200, token });
                } else res.json({ status: 403, message: "Password Incorrect" });
            });
        else res.json({ status: 403 });
    });
});

app.post('/register', (req, res) => {
    const { name, pass } = req.body;
    readFile("database/users.json", (e, data) => {
        let user = {};
        const users = JSON.parse(data);
        const matchingUsers = users.filter(user => user.name === name);
        if (matchingUsers.length === 0) {
            hash(pass, 10, (e, hashed) => {
                users.unshift({ name, pass: hashed });
                writeFile('database/users.json', JSON.stringify(users, null, 2), e => {});
                const token = sign({ name, pass }, process.env.ACCESS_TOKEN_SECRET);
                token && res.json({ status: 200, token });
            });
        } else res.json({ status: 409 });
    });
});

const authorizeToken = (req, res, next) => {
    if (req.headers['authorization']) {
        const token = req.headers['authorization'].split('Bearer ')[1];
        try {
            const verifiedToken = verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.data = verifiedToken;
            next();
        } catch (e) { 
            res.json({ status: 400 }); 
        }
    }
    next();
}

app.get('/getUserData', authorizeToken, (req, res) => req.data && res.json({ status: 200, data: req.data }));

app.listen(5000, () => console.log('Server running...'));