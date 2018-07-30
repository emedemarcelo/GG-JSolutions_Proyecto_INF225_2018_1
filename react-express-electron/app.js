const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/test', (req, res) => {
    console.log(req.query);
    res.send({
        message: "message from express"
    });
});

app.listen(5000, () => console.log('App running on port 5000 🔥'));
