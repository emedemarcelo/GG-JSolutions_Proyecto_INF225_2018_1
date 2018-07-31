const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
// For API routing
const router = express.Router(); // Get an instance of the express router
// For Yahoo Finance API
const yahooFinance = require('yahoo-finance');

app.use(bodyParser.json()); // So we can get data from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // To use 'public/index.html'

// Register our routes
// all of our routes will be prefixed with /api
app.use('/api', router);

// 'api/'
router.get('/', function(req, res){
    res.send({message: 'Yay, it works!'});
});

// 'api/test'
router.get('/test', (req, res) => {
    console.log(req.query);
    res.send({
        message: "message from express"
    });
});

// 'api/yf'
router.get('/yf', function(req, res){
    console.log("Received data from requester: ");
    console.log(req.query);
    let pre_accion    = "^",
        accion        = req.query.accion,
        mercado       = req.query.mercado,
        fecha_inicio  = req.query.fecha_inicio,
        fecha_termino = req.query.fecha_termino,
        trayectorias  = req.query.trayectorias,
        tasa_riesgo   = req.query.tasa_riesgo;

    yahooFinance.historical({
        symbol: pre_accion + accion,
        from: fecha_inicio,
        to: fecha_termino
    }, function(err, quotes){
        res.send(quotes);
    });

});

// listen server should be the last thing to do, after doing all
// the config of our back-end routes
app.listen(5000, () => console.log('App running on port 5000 🔥'));
