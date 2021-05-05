const express = require('express');
const app = express();
const { writeFile, readFile } = require('fs');
const { verify, sign } = require('jsonwebtoken');
const {} = require('dotenv').config();
const { compare, hash } = require('bcrypt');
const { createTransport } = require('nodemailer');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json({ limit: '1MB' }));

const transporter = createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PASS
    }
})
 
app.post('/login', (req, res) => {
    const { name, pass } = req.body;
    readFile("database/users.json", (_, data) => {
        const users = JSON.parse(data);
        const user = users.filter(account => account.name === name);
        if (user[0])
            compare(pass, user[0].pass, (_, matches) => {
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
    readFile("database/users.json", (_, data) => {
        let user = {};
        const users = JSON.parse(data);
        const matchingUsers = users.filter(user => user.name === name);
        if (matchingUsers.length === 0) {
            hash(pass, 10, (_, hashed) => {
                users.unshift({ name, pass: hashed });
                writeFile('database/users.json', JSON.stringify(users, null, 2), _ => {});
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
        } catch (_) { 
            res.json({ status: 400 }); 
        }
    }
    next();
}

app.get('/getUserData', authorizeToken, (req, res) => 
    req.data && res.json({ status: 200, data: req.data }));

app.get('/getQuestions', (_, res) => {
    readFile("database/questions.json", (_, data) => {
        return data && res.json({ status: 200, questions: JSON.parse(data) });
    });
});

app.get('/badwords', (_, res) => {
    readFile("./utils/badwords.json", (_, data) => {
        const objects = JSON.parse(data);
        res.json({ status: 200, badwords: objects });
    });
});

app.post('/createQuestion', (req, res) => {
    const { from, value } = req.body; 
    readFile("database/questions.json", (_, data) => {
        const question = {
            from,
            question: value,
            replies: []
        };
        const objects = JSON.parse(data);
        objects.unshift(question);
        writeFile("database/questions.json", JSON.stringify(objects, null, 2), _ => {});
        res.json({ status: 200, data: objects });
    });
});

app.post('/reply', (req, res) => {
    const { from, reply, question } = req.body;
    readFile("database/questions.json", (_, data) => {
        const objects = JSON.parse(data);
        const { replies } = objects[objects.findIndex(currQuestion => 
            currQuestion.from === question.from && 
            currQuestion.question === question.question)];
        replies.unshift({
            from,
            reply
        });
        writeFile("database/questions.json", JSON.stringify(objects, null, 2), _ => {});
        res.json({ status: 200, replies });
    });
});

app.listen(5000, () => console.log('Server running...'));