const express = require('express');
const schedule = require('node-schedule');
const app = express();
const router = express.Router();
app.use(express.json());

app.use((req, res, next) => {
  res.set('Content-Type', 'application/json');
  next();
});

const startServer = async _ => {

  const database = require("./src/database");
  let db = await database.setup();

  const routes = require('./src/routes');
  routes.routes(app, db);

  const expoPush = require('./src/ExpoClient');
  expoPush.expoPush(app);

  const userAccount = require('./src/userAccount');
  userAccount.userAccount(app, db);

  const friends = require('./src/friends');
  friends.friends(app, db);

  const job = schedule.scheduleJob("0 */10 * * * *", function(){
    console.log('Put scheduled task here : ' + new Date());
  });

  const PORT = process.env.PORT || 8080;
  const server = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
  });
  process.on('unhandledRejection', err => {
    console.error(err);
    throw err;
  });

  return server;
}

startServer();