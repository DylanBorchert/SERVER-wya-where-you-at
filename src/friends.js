

module.exports.friends = (app, database) => {

    app.get('/api/friends/:email', async (req, res) => {
        try {

            //grab all friend user info 
            let friends = database.query('SELECT email, username, fname, phone_number, profile_pic FROM users WHERE email IN (SELECT friend_email as email FROM friends WHERE approved = 1 and email = ? union SELECT email FROM friends WHERE approved = 1 and friend_email = ?)', [req.params.email, req.params.email]);

            let records = await friends;


            res.status(200).send(JSON.stringify(records)).end();
        } catch (err) {
            console.log(err);
            res.status(400).send(err).end();
        }
    });


    app.get('/api/friends/Reqests/:email', async (req, res) => {
        try {

            //grab all friend user info 
            let friends = database.query('SELECT email, username, fname, phone_number, profile_pic FROM users WHERE email IN (SELECT email FROM friends WHERE approved = 0 and friend_email = ?)', [req.params.email, req.params.email]);

            let records = await friends;


            res.status(200).send(JSON.stringify(records)).end();
        } catch (err) {
            console.log(err);
            res.status(400).send(err).end();
        }
    });

    app.get('/api/friends/ReqestSent/:email', async (req, res) => {
        try {

            //grab all friend user info 
            let friends = database.query('SELECT email, username, fname, phone_number, profile_pic FROM users WHERE email IN (SELECT friend_email as email FROM friends WHERE approved = 0 and email = ?)', [req.params.email, req.params.email]);

            let records = await friends;

            res.status(200).send(JSON.stringify(records)).end();

        } catch (err) {
            console.log(err);
            res.status(400).send(err).end();
        }
    });

    app.put('/api/friends/ReqestAccept/:friendemail/:email', async (req, res) => {
        try {

            //grab all friend user info 
            let friends = database.query('UPDATE friends SET approved = 1 WHERE friend_email = ? and email = ?', [req.params.friendemail, req.params.email]);

            let records = await friends;

            res.status(200).send(JSON.stringify(records)).end();

        } catch (err) {
            console.log(err);
            res.status(400).send(err).end();
        }
    });

    app.post('/api/friends/Reqest/:friendemail/:email', async (req, res) => {
        try {

            //grab all friend user info 
            let friends = database.query('INSERT INTO friends (email, friend_email, approved) VALUES (?, ?, 0)', [req.params.email, req.params.friendemail]);

            let records = await friends;

            res.status(200).send(JSON.stringify(records)).end();

        } catch (err) {
            console.log(err);
            res.status(400).send(err).end();
        }
    });



}