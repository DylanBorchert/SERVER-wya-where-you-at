const unirest = require("unirest");
const express = require("express");
const router = express.Router();
const app = express();
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));

router.get("/geolocation", (req, res) => {
    const apiCall = unirest(
        "GET",
        "https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/"
    );
    apiCall.query({
	"ip": req["x-forwarded-for"] || req.socket.remoteAddress.replace(/^.*:/, ''),
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
