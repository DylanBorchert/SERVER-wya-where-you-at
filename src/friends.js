

module.exports.friends = (app, database) => {

    app.get('/api/friends/:email', async (req, res) => {
        try {

            //grab all friend user info 
            let friends = database.query('SELECT email, username, fname, phone_number, profile_pic, status, push_token FROM users WHERE email IN (SELECT friend_email as email FROM friends WHERE approved = 1 and email = ? union SELECT email FROM friends WHERE approved = 1 and friend_email = ?)', [req.params.email, req.params.email]);

            let records = await friends;


            res.status(200).send(JSON.stringify(records)).end();
        } catch (err) {
            console.log(err);
            res.status(400).send(err).end();
        }
    });


    app.get('/api/friends/requests/:email', async (req, res) => {
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

    app.get('/api/friends/requestSent/:email', async (req, res) => {
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

    app.put('/api/friends/requestAccept/:friendemail/:email', async (req, res) => {
        try {

            //grab all friend user info 
            let friends = database.query('UPDATE friends SET approved = 1 WHERE friend_email = ? and email = ?', [req.params.email, req.params.friendemail]);

            let records = await friends;

            res.status(200).send(JSON.stringify(records)).end();

        } catch (err) {
            console.log(err);
            res.status(400).send(err).end();
        }
    });

    app.post('/api/friends/request/:friendemail/:email', async (req, res) => {
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

    app.get('/api/friends/Find/:email', async (req, res) => {
        try{
                
                let friends = database.query('SELECT email, username, fname, phone_number, profile_pic FROM users WHERE email NOT IN (SELECT friend_email as email FROM friends WHERE email = ? union SELECT email FROM friends WHERE friend_email = ?) and email != ?', [req.params.email, req.params.email, req.params.email]);
    
                let records = await friends;
    
                res.status(200).send(JSON.stringify(records)).end();
    
        } catch (err) {
            console.log(err);
            res.status(400).send
        }
    });





}