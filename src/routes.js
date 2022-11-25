"use strict";

module.exports.routes = (app, database) => {
    const unirest = require("unirest"); // used for geolocation

    app.get('/api/courses', async (req, res) => {
        try{
            let query;
            query = database.query('SELECT * FROM courses');

            const records = await query;

            res.status(200).send(JSON.stringify(records)).end();
        } catch (err) {
            console.log(err);
            res.status(400).send(err).end();
        }
    });

    app.get('/api/courses/tut', async (req, res) => {
        try{
            let query;
            query = database.query('SELECT * FROM courses WHERE course_type = ?', ['tut']);

            const records = await query;

            res.status(200).send(JSON.stringify(records)).end();
        } catch (err) {
            console.log(err);
            res.status(400).send(err).end();
        }
    });

    app.get('/api/courses/lec', async (req, res) => {
        try{
            let query;
            query = database.query('SELECT * FROM courses WHERE course_type = ?', ['lec']);

            const records = await query;

            res.status(200).send(JSON.stringify(records)).end();
        } catch (err) {
            console.log(err);
            res.status(400).send(err).end();
        }
    });

    app.get('/api/courses/lab', async (req, res) => {
        try{
            let query;
            query = database.query('SELECT * FROM courses WHERE course_type = ?', ['lab']);

            const records = await query;

            res.status(200).send(JSON.stringify(records)).end();
        } catch (err) {
            console.log(err);
            res.status(400).send(err).end();
        }
    });

    app.get('/api/courses/:id', async (req, res) => {
        try{
            let query;
            query = database.query('SELECT * FROM courses WHERE id = ?', [req.params.id]);

            const records = await query;

            res.status(200).send(JSON.stringify(records)).end();
        } catch (err) {
            console.log(err);
            res.status(400).send(err).end();
        }
    });

    app.get('/api/courses/subject/:code', async (req, res) => {
        try {
            let query;
            query = database.query('SELECT * FROM courses WHERE course_subject = ?', [req.params.code]);
            
            const records = await query;

            res.status(200).send(JSON.stringify(records)).end();
        } catch (err) {
            console.log(err);
            res.status(400).send(err).end();
        }
    });

    app.get('/api/courses/code/:code', async (req, res) => {
        try{
            let query;
            query = database.query('SELECT * FROM courses WHERE course_code = ?', [req.params.code]);
            
            const records = await query;
    
            res.status(200).send(JSON.stringify(records)).end();
        } catch (err) {
            console.log(err);
            res.status(400).send(err).end();
        }
        
    });

    app.get('/api/courses/search/:name', async (req, res) => {
        try{
            let query;
            query = database.query('SELECT * FROM courses WHERE name LIKE ?', ['%' + req.params.name + '%']);

            const records = await query;

            res.status(200).send(JSON.stringify(records)).end();
        } catch (e) {
            console.error(e);
            res.status(400).send(err).end();
        }
        
    });

    app.post('/api/courses', async (req, res) => {
        try {
            console.log(req.body);
            let query;
            query = database.query('INSERT INTO courses (name, course_subject, course_code, course_section, start_time, end_time, days_of_week, semester, course_type, room) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [req.body.name, req.body.course_subject, req.body.course_code, req.body.course_section, req.body.start_time, req.body.end_time, req.body.days_of_week, req.body.semester, req.body.course_type, req.body.room]);
            
            const records = await query;

            res.status(200).send(JSON.stringify(records)).end();
        } catch (err) {
            console.log(err);
            res.status(400).send(err).end();
        }
    });


    //add course to user
    app.post('/api/schedules', async (req, res) => {

        try {
            //check if course id exists
            database.query('SELECT * FROM courses WHERE id = ?', [req.body.course_id], async (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(400).send(err).end();
                } else {
                    if (result.length > 0) {
                        //check if user id exists
                        database.query('SELECT * FROM users WHERE email = ?', [req.body.email], async (err, result) => {
                            if (err) {
                                console.log(err);
                                res.status(400).send(err).end();
                            } else {
                                if (result.length > 0) {
                                    //check if user already has course
                                    database.query('SELECT * FROM schedules WHERE email = ? AND course_id = ?', [req.body.email, req.body.course_id], async (err, result) => {
                                        if (err) {
                                            console.log(err);
                                            res.status(400).send(err).end();
                                        } else {
                                            if (result.length > 0) {
                                                res.status(400).send('User already has course').end();
                                            } else {
                                                //add course to user
                                                let query;
                                                query = database.query('INSERT INTO schedules (email, course_id) VALUES (?, ?)', [req.body.email, req.body.course_id]);
                                                
                                                const records = await query;

                                                res.status(200).send(JSON.stringify(records)).end();
                                            }
                                        }
                                    });
                                } else {
                                    res.status(400).send('User does not exist').end();

                                }
                            }
                        });
                    } else {
                        res.status(400).send('Course does not exist').end();
                    }
                }
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err).end();

        }
    });

    app.get('/api/schedules/:email', async (req, res) => {
        try {
            let query;
            query = database.query('SELECT * FROM schedules WHERE email = ?', [req.params.email]);

            const records = await query;

            res.status(200).send(JSON.stringify(records)).end();
        } catch (err) {
            console.log(err);
            res.status(400).send(err).end();
        }
    });

    app.get('/api/status/:email', async (req, res) => {
        try {
            let query;
            query = database.query('SELECT * FROM users WHERE email = ?', [req.params.email]);

            const records = await query;

            res.status(200).send(JSON.stringify(records)).end();
        } catch (err) {
            console.log(err);
            res.status(400).send(err).end();
        }
    });

    app.put('/api/status', async (req, res) => {
        try {
            let query;
            query = database.query('UPDATE users SET status = ? WHERE email = ?', [req.body.status, req.body.email]);

            const records = await query;

            res.status(200).send(JSON.stringify(records)).end();
        } catch (err) {
            console.log(err);
            res.status(400).send(err).end();
        }
    });

    app.get('/api/users', async (req, res) => {
        try {
            let query;
            query = database.query('SELECT * FROM users');

            const records = await query;

            res.status(200).send(JSON.stringify(records)).end();
        } catch (err) {
            console.log(err);
            res.status(400).send(err).end();
        }
    });

    app.get('/api/users/:email', async (req, res) => {
        try {
            let query;
            query = database.query('SELECT * FROM users WHERE email = ?', [req.params.email]);

            const records = await query;

            res.status(200).send(JSON.stringify(records)).end();
        } catch (err) {
            console.log(err);
            res.status(400).send(err).end();
        }
    });



    app.get("/api/geolocation", (req, res) => {
        const apiCall = unirest(
          "GET",
          "https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/"
        );
        apiCall.query({
            /**
             * Only one of the "ip" parameters should be active at a time.
             * 
             * If you're testing things locally, comment out the first "ip" parameter and uncomment the second one.
             * 
             * Otherwise, the first one should remain uncommented, as that's how you retrieve the client device's IP
             * when the server is running (i.e., it'll be the one we use when we go live).
             *  */ 
            "ip": req["x-forwarded-for"] || req.socket.remoteAddress.replace(/^.*:/, ''),
            // "ip": "142.109.127.37",
        });
        apiCall.headers({
          "x-rapidapi-host": "ip-geolocation-ipwhois-io.p.rapidapi.com",
          "x-rapidapi-key": "6960f52de6msh9db305e6cdd65fbp1965aejsn85a8048f9529",
            "useQueryString": true
        });
        apiCall.end(function(result) {
          if (res.error) throw new Error(result.error);
          res.send(result.body);
        });
    });    
    
};
