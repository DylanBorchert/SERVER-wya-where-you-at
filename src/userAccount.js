"use strict";

require('dotenv').config();

module.exports.userAccount = (app, database) => {

    app.post('/login', async (req, res) => {
        try {
            let query;
            query = database.query('SELECT email, username, fname, phone_number, profile_pic FROM users WHERE email = ? AND password = ?', [req.body.email, req.body.password]);
            console.log(req.body.push_token);
            let updateToken = database.query('UPDATE users SET push_token = ? WHERE email = ?', [req.body.push_token, req.body.email]);

            let response = await updateToken;
            console.log(response);

            const records = await query;

            console.log(records);
            if (records.length > 0) {
                let result = records[0];
                result.status = "success";
                res.status(200).send(JSON.stringify(records)).end();
            } else {
                res.status(400).send(JSON.stringify({
                    status: "failed",
                    error: 'Invalid email or password'
                })).end();
            }
        } catch (err) {
            console.log(err);
            res.status(400).send(err).end();

        }
    });

    //alter table users add default '' for profile_pic

    app.post('/signup', async (req, res) => {
        try {
            let query;
            query = database.query('INSERT INTO users (email, password, username, fname, phone_number, push_token) VALUES (?, ?, ?, ?, ?, ?)', [req.body.email, req.body.password, req.body.userName, req.body.name, req.body.phoneNumber, req.body.pushtoken]);
            
            let response = await query;
            console.log(response);
            res.status(200).send(JSON.stringify(response)).end();
        } catch (err) {
            console.log(err);
            res.status(400).send(err).end();
        }
    });

    app.get('/api/status/:email', async (req, res) => {
        try {
            let query;
            query = database.query('SELECT * FROM status WHERE email = ?', [req.params.email]);

            const records = await query;

            res.status(200).send(JSON.stringify(records)).end();
        } catch (err) {
            console.log(err);
            res.status(400).send(err).end();
        }
    });

    app.put('/api/status/pushtoken', async (req, res) => {
        try {
            let query;
            query = database.query('UPDATE status SET push_token = ? WHERE email = ?', [req.body.push_token, req.body.email]);

            const records = await query;

            res.status(200).send(JSON.stringify(records)).end();
        } catch (err) {
            console.log(err);
            res.status(400).send(err).end();
        }
    });


}