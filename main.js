const express = require('express');
const app = express();
const { writeFile, readFile } = require('fs');
const { verify, sign } = require('jsonwebtoken');
const {} = require('dotenv').config();
const { compare, hash } = require('bcrypt');
const cors = require('cors');
const { createTransport } = require('nodemailer');
const pool = require('./dbSetup');

// email setup
const transporter = createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.BOT_EMAIL,
        pass: process.env.BOT_PASS
    }
});

app.use(cors());
app.use(express.json({ limit: '1MB' }));
 
app.post('/login', async (req, res) => {
    const { name, pass } = req.body;
    /* readFile("database/users.json", (_, data) => {
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
    }); */
	const user = await pool.query("SELECT * FROM users WHERE user_name = $1", [ name ]);
	if (user.rows.length !== 0) {
		compare(pass, user.rows[0].user_pass, (_, matches) => {
			if (matches) {
				const token = sign({ name, pass}, process.env.ACCESS_TOKEN_SECRET);
				token && res.json({ status: 200, token });
			} else res.json({ status: 403, message: "Password Incorrect" });
		});
	} else res.json({ status: 403, message: "Username incorrect" });
});

app.post('/register', async (req, res) => {
    const { name, pass } = req.body;
    /* readFile("database/users.json", (_, data) => {
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
    }); */

	const matchingUsers = await pool.query("SELECT * FROM users WHERE user_name = $1", [ name ]);
	if (matchingUsers.rows.length === 0) {
		hash(pass, 10, async (_, hashed) => {
			await pool.query("INSERT INTO users (user_name, user_pass) VALUES ($1, $2)", [ name, hashed ]);
			const token = sign({ name, pass }, process.env.ACCESS_TOKEN_SECRET);
			token && res.json({ status: 200, token });
		});
	} else res.json({ status: 409 });
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

app.get('/getQuestions', async (_, res) => {
    /* readFile("database/questions.json", (_, data) => {
        return data && res.json({ status: 200, questions: JSON.parse(data) });
    }); */
	const questions = await pool.query("SELECT * FROM questions ORDER BY question_id DESC");
	if (questions.rows.length !== 0) {
		questions.rows.forEach((question, i) => {
			const replies = JSON.parse(question.replies);
			questions.rows[i].replies = replies;
		});
		res.json({ status: 200, questions: questions.rows });
	} else res.json({ status: 200, questions: [] });
});

app.get('/badwords', (_, res) => {
    readFile("./utils/badwords.json", (_, data) => {
        const objects = JSON.parse(data);
        res.json({ status: 200, badwords: objects });
    });
});

app.post('/createQuestion', async (req, res) => {
    const { from, value } = req.body; 
    /* readFile("database/questions.json", (_, data) => {
        const question = {
            from,
            question: value,
            replies: []
        };
        const objects = JSON.parse(data);
        objects.unshift(question);
        writeFile("database/questions.json", JSON.stringify(objects, null, 2), _ => {});
        res.json({ status: 200, data: objects });
    }); */
	
	const questions = await pool.query("SELECT * FROM questions");
	const amtOfQuestions = questions.rows.length;
	await pool.query("INSERT INTO questions (question_from, content, replies) VALUES ($1, $2, $3)", [ from, value, '[]' ]);
	const newQuestions = await pool.query("SELECT * FROM questions");
	const newAmtOfQuestions = newQuestions.rows.length;
	if (amtOfQuestions + 1 === newAmtOfQuestions) res.json({ status: 200 });
	else res.json({ status: 500 });
});

app.post('/reply', async (req, res) => {
    const { from, reply, question } = req.body;
    /* readFile("database/questions.json", (_, data) => {
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
    }); */

	const questions = await pool.query("SELECT * FROM questions WHERE question_from = $1 AND content = $2", [ question.from, question.question ]);
	if (questions.rows.length !== 0) {
		const replies = JSON.parse(questions.rows[0].replies);
		replies.push({ from, reply });
		await pool.query("UPDATE questions SET replies = $1 WHERE question_from = $2 AND content = $3 AND question_id = $4", [ JSON.stringify(replies), question.from, question.question, questions.rows[0].question_id ]);
		res.json({ status: 200 });
	}
});

app.get('/times', async (_, res) => {
    /* readFile("database/times.json", (_, data) => {
        return !_ ? res.json({ status: 200, times: JSON.parse(data) }) : res.json({ status: 200, error: _ });
    }); */

	const times = await pool.query("SELECT * FROM times ORDER BY time DESC");
	res.json({ status: 200, times: times.rows });
});

app.post('/createTime', async (req, res) => {
    const { name, instrument, time } = req.body;
    /* readFile("database/times.json", (_, data) => {
        const objects = JSON.parse(data);
        const postedTime = { time, instrument, name };
        objects.unshift(postedTime);
        writeFile("database/times.json", JSON.stringify(objects, null, 2), _ => {});
        res.json({ status: 200, times: objects });
    }); */

	await pool.query("INSERT INTO times (time, instrument, name) VALUES ($1, $2, $3)", [ time, instrument, name ]);
	const times = await pool.query("SELECT * FROM times ORDER BY time DESC");
	res.json({ status: 200, times: times.rows });
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

app.post('/newUsername', async (req, res) => {
    /* readFile("database/users.json", (_, data) => {
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
    }); */

	const user = await pool.query("SELECT * FROM users WHERE user_name = $1", [ req.body.currUsername ]);
	if (user.rows.length !== 0) {
		const correctPass = await compare(req.body.password, user.rows[0].user_pass);
		if (correctPass) {
			console.log(req.body.newUsername);
			await pool.query("UPDATE users SET user_name = $1 WHERE user_id = $2", [ req.body.newUsername, user.rows[0].user_id ]);
			const newUserInfo = await pool.query("SELECT * FROM users WHERE user_name = $1 AND user_id = $2", [ req.body.newUsername, user.rows[0].user_id ]);
			res.json({ status: 200, newData: newUserInfo.rows[0] });
		} else res.json({ status: 403 });
	}
});

app.post('/deleteAccount', async (req, res) => {
    /* readFile("database/users.json", (_, data) => {
        const objects = JSON.parse(data);
        const index = objects.findIndex(user => user.name === req.body.username);
        objects.splice(index, 1);
        writeFile("database/users.json", JSON.stringify(objects, null, 2), _ => {});
        res.json({ status: 200 });
    }); */

	const user = await pool.query("SELECT * FROM users WHERE user_name = $1", [ req.body.username ]);
	if (user.rows.length !== 0) {
		await pool.query("DELETE FROM users WHERE user_name = $1 AND user_id = $2", [ req.body.username, user.rows[0].user_id ]);
		res.json({ status: 200 });
	} else res.json({ status: 500 });
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

app.post('/report', async (req, res) => {
    // readFile("database/stats.json", (_, data) => {
        // const object = JSON.parse(data);
		const selected = await pool.query("SELECT * FROM stats");
		const object = selected.rows[0];	
		const operatingSystems = JSON.parse(object.operating_systems);
		const webBrowsers = JSON.parse(object.web_browsers);
        let OSMatch = false;
        let browserMatch = false;
        operatingSystems.forEach(os => {
            if (os.System === req.body.OS) 
               os.visits++, OSMatch = true;
        });
        webBrowsers.forEach(browser => {
            if (browser.Name === req.body.browser)
                browser.visits++, browserMatch = true;
        });
        !OSMatch && operatingSystems.unshift({ System: req.body.OS, visits: 1 });
        !browserMatch && webBrowsers.unshift({ Name: req.body.browser, visits: 1 });
		
        let mostPopularBrowser = { visits: 0 };
        let mostPopularOS = { visits: 0 };
        webBrowsers.forEach(browser => {
            if (browser.visits > mostPopularBrowser.visits) mostPopularBrowser = browser;
        });
        operatingSystems.forEach(OS => {
            if (OS.visits > mostPopularOS.visits) mostPopularOS = OS;
        });
        // writeFile("database/stats.json", JSON.stringify(object, null, 2), _ => {});
		await pool.query("UPDATE stats SET popular_browser = $1, popular_operating_system = $2, operating_systems = $3, web_browsers = $4 WHERE stats_identifier = 12", [ JSON.stringify(mostPopularBrowser), JSON.stringify(mostPopularOS), JSON.stringify(operatingSystems), JSON.stringify(webBrowsers) ]);
		
		res.json({ status: 200 });
    // });
});

app.get('/getStats', async (req, res) => {
    /* readFile("database/stats.json", (e, data) => {
        const object = JSON.parse(data);
        return !e && res.json({ status: 200, object });
        res.json({ status: 500 });
    }); */
	const object = await pool.query("SELECT * FROM stats");
	return object && res.json({ status: 200, object: object.rows[0] });
	res.json({ status: 500 });
});

app.post('/submitNewsletter', async (req, res) => {
    const { date, content } = req.body;
    /* readFile("database/newsletters.json", (_, data) => {
        const objects = JSON.parse(data);
        const newsletter = JSON.parse(JSON.stringify({
            date,
            content
        }));
        objects.unshift(newsletter);
        writeFile("database/newsletters.json", JSON.stringify(objects, null, 2), _ => {});
    }); */
	await pool.query("INSERT INTO newsletters (date_created, content) VALUES ($1, $2)", [ date, content ]);
	res.json({ status: 200 });
});

app.get('/getNewsletters', async (req, res) => {
    /* readFile("database/newsletters.json", (e, data) => {
        const objects = JSON.parse(data);
        return !e && res.json({ status: 200, objects });
        res.json({ status: 500 });
    }); */
	const objects = await pool.query("SELECT * FROM newsletters ORDER BY newsletter_id DESC");
	if (objects.rows.length !== 0) res.json({ status: 200, objects: objects.rows });
	else res.json({ status: 200 });
});

app.post('/email', (req, res) => {
    const { user, question, date } = req.body;
    transporter.sendMail({
        from: process.env.BOT_EMAIL,
        to: process.env.ADMIL_EMAIL_TO,
        subject: `${user} asked a question`,
        html: `
            <h3>${user} asked a question on MTMSBandSite on ${date}.</h3>
            <p style="font-size: 1.3em">
                ${user} asked:
                <br/>
                <b>${question}</b>
            </p>
            <p style="font-size: 1.2em">Answer it <a href="https://mtmsband.netlify.app/questions">by clicking this link!</a>
            <br/>
            <br/>
            <p style="font-size: 1.3em">
                Sincerely,
                <br/>
                <b><em>MTMS Email Bot</em></b>
            </p>
        `
    }, (e, info) => {
        if (e) {
            console.log(e);
            res.json({ status: 500 });
        } else {
            console.log(info.response);
            res.json({ status: 200, message: info.response });
        }
    });
});

app.listen(process.env.PORT || 8080, () => console.log('Server running...'));
