const express = require('express');
const app = express();
const { writeFile, readFile } = require('fs');
const { verify, sign } = require('jsonwebtoken');
const {} = require('dotenv').config();
const { compare, hash } = require('bcrypt');
const cors = require('cors');

app.use(cors());
app.use(express.json({ limit: '1MB' }));
 
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

app.get('/times', (_, res) => {
    readFile("database/times.json", (_, data) => {
        return !_ ? res.json({ status: 200, times: JSON.parse(data) }) : res.json({ status: 200, error: _ });
    })
});

app.post('/createTime', (req, res) => {
    const { name, instrument, time } = req.body;
    readFile("database/times.json", (_, data) => {
        const objects = JSON.parse(data);
        const postedTime = { time, instrument, name };
        objects.unshift(postedTime);
        writeFile("database/times.json", JSON.stringify(objects, null, 2), _ => {});
        res.json({ status: 200, times: objects });
    });
});

app.post('/authorizeAdmin', (req, res) => {
    let status = "NOT_LOGGED_IN";
    if (req.body.name && req.body.pass && req.body.dbpass)
        if (req.body.name === process.env.ADMIN_NAME && req.body.pass === process.env.ADMIN_PASS)
            if (req.body.dbpass === process.env.DB_PASS) {
                status = "LOGGED_IN";
                return res.json({ status: 200 });
            }
    status === "NOT_LOGGED_IN" && res.json({ status: 401 });
});

app.post('/newUsername', (req, res) => {
    readFile("database/users.json", (_, data) => {
        const objects = JSON.parse(data);
        const index = objects.findIndex(user => user.name === req.body.currUsername);
        compare(req.body.password, objects[index].pass, (e, correct) => {
            const { newUsername } = req.body;
            if (correct && !e) {
                objects[index].name = newUsername;
                writeFile("database/users.json", JSON.stringify(objects, null, 2), _ => {});
                res.json({ status: 200, newData: objects[index] });
            } else res.json({ status: 401 });
        });
    });
});

app.post('/deleteAccount', (req, res) => {
    readFile("database/users.json", (_, data) => {
        const objects = JSON.parse(data);
        const index = objects.findIndex(user => user.name === req.body.username);
        objects.splice(index, 1);
        writeFile("database/users.json", JSON.stringify(objects, null, 2), _ => {});
        res.json({ status: 200 });
    });
});

const authorizeAdmin = (req, res, next) => {
    const { dbId, adminPass, adminUser } = req.body;
    if (dbId && adminPass && adminUser) {
        if (dbId === process.env.DATABASE_ID && 
            adminPass === process.env.ADMIN_PASS &&
            process.env.ADMIN_USERS.split(' ').includes(adminUser)) {
            req.authorized = true;
            next();
        } else {
            req.authorized = false;
            next();
        }
    } else {
        req.authorized = false;
        next();
    }
}

app.post('/authenticateAdmin', authorizeAdmin, (req, res) => {
    if (req.authorized) {
        const { adminUser } = req.body;
        res.json({ status: 200, adminUser });
    } else res.json({ status: 401 });
});

app.post('/report', (req, res) => {
    readFile("database/stats.json", (_, data) => {
        const object = JSON.parse(data);
        let OSMatch = false;
        let browserMatch = false;
        object.operatingSystems.forEach(os => {
            if (os.System === req.body.OS) 
                os.visits++, OSMatch = true;
        });
        object.webBrowsers.forEach(browser => {
            if (browser.Name === req.body.browser)
                browser.visits++, browserMatch = true;
        });
        !OSMatch && object.operatingSystems.unshift({ System: req.body.OS, visits: 1 });
        !browserMatch && object.webBrowsers.unshift({ Name: req.body.browser, visits: 1 });

        let mostPopularBrowser = { visits: 0 };
        let mostPopularOS = { visits: 0 };
        object.webBrowsers.forEach(browser => {
            if (browser.visits > mostPopularBrowser.visits) mostPopularBrowser = browser;
        });
        object.operatingSystems.forEach(OS => {
            if (OS.visits > mostPopularOS.visits) mostPopularOS = OS;
        });
        object.mostPopularWebBrowser = mostPopularBrowser, object.mostPopularOS = mostPopularOS;
        writeFile("database/stats.json", JSON.stringify(object, null, 2), _ => {});
        res.json({ status: 200 });
    });
});

app.get('/getStats', (req, res) => {
    readFile("database/stats.json", (e, data) => {
        const object = JSON.parse(data);
        return !e && res.json({ status: 200, object });
        res.json({ status: 500 });
    });
});

app.post('/submitNewsletter', (req, res) => {
    const { date, content } = req.body;
    readFile("database/newsletters.json", (_, data) => {
        const objects = JSON.parse(data);
        const newsletter = JSON.parse(JSON.stringify({
            date,
            content
        }));
        objects.unshift(newsletter);
        writeFile("database/newsletters.json", JSON.stringify(objects, null, 2), _ => {});
    });
});

app.get('/getNewsletters', (req, res) => {
    readFile("database/newsletters.json", (e, data) => {
        const objects = JSON.parse(data);
        return !e && res.json({ status: 200, objects });
        res.json({ status: 500 });
    });
});

app.post('/clearNewslettersDB', (req, res) => {
    if (req.body.dbId === process.env.DATABASE_ID) {
        writeFile("database/newsletters.json", JSON.stringify([], null, 2), _ => {});
        res.json({ status: 200 });
    } else res.json({ status: 401 });
});

app.post('/clearQuestionsDB', (req, res) => {
    if (req.body.dbId === process.env.DATABASE_ID) {
        writeFile("database/questions.json", JSON.stringify([], null, 2), _ => {});
        res.json({ status: 200 });
    } else res.json({ status: 401 });
});

app.post('/clearStatsDB', (req, res) => {
    if (req.body.dbId === process.env.DATABASE_ID) {
        writeFile("database/stats.json", JSON.stringify({
            "operatingSystems": [],
            "webBrowsers": [],
            "mostPopularOS": {},
            "mostPopularWebBrowser": {}
        }), _ => {});
        res.json({ status: 200 });
    } else res.json({ status: 401 });
});

app.listen(process.env.PORT || 8080, () => console.log('Server running...'));