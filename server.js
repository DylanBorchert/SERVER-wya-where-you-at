const express = require("express");
const router = express.Router();
const app = express();
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));

router.get("/", (req, res) => {
  res.send("Hello World");
});