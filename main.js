const express = require('express');
const app = express();
const { writeFile, readFile } = require('fs');
const { verify, sign } = require('jsonwebtoken');
const {} = require('dotenv').config();

app.use(express.json({ limit: '1MB' }));
 
app.post('/register', (req, res) => {
    const { name, pass } = req.body;
    readFile("database/users.json", (e, data) => {
        const users = JSON.parse(data);
        const matchingUsers = users.filter(user => user.name === name);
        if (matchingUsers.length === 0) {
            users.unshift({ name, pass });
            writeFile('database/users.json', JSON.stringify(users, null, 2), e => {});
            const token = sign({ name, pass }, process.env.ACCESS_TOKEN_SECRET);
            return token && res.json({ status: 200, token });
        } else res.json({ status: 409 });
    });
});

app.listen(5000, () => console.log('Server running...'));