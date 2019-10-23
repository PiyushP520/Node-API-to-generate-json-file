const express = require('express')
const app = express();
var fs = require('fs');
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
});

app.post('/convertToJson', function (req, res) {
    fs.writeFile("input.json", JSON.stringify(req.body.payload), function (err) {
        if (err) throw err;
        else {
            fs.copyFile('input.json', '../aws/src/assets/input.json', function (err) {
                if (err) throw err;
            });
            res.send("json formation done successfully");
        }
    }
    );
})

app.listen(3000, function () {
    console.log('server running on port 3000');
})