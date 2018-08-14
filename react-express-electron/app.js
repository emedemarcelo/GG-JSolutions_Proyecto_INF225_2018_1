const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const cors = require('cors');

// For API routing
const router = express.Router(); // Get an instance of the express router
// For Yahoo Finance API
const yahooFinance = require('yahoo-finance');

app.use(cors());
app.use(bodyParser.json()); // So we can get data from POST
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public'))); // To use 'public/index.html'

// Register our routes
// all of our routes will be prefixed with /api
app.use('/api', router);

// 'api/'
router.get('/', function (req, res) {
    res.send({
        message: 'Yay, it works!'
    });
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

// 'api/test'
router.get('/analysis', (req, res) => {
    axios.get('http://localhost:8000/analysis', {
        params: {
            hola: "hola"
        }
    }).then(res => {
        let data = res.data;
        console.log(data);
    })
});


// 'api/yf'
router.get('/yf', function (req, res) {
    //console.log("Received data from requester: ");
    //console.log(req.query);

    let pre_accion = "^",
        accion = "^" + req.query.accion,
        mercado = req.query.mercado,
        fecha_inicio = req.query.fecha_inicio,
        fecha_termino = req.query.fecha_termino,
        trayectorias = req.query.trayectorias,
        tasa_riesgo = req.query.tasa_riesgo;

    let data_to_process;

    yahooFinance.historical({
        symbol: accion,
        from: fecha_inicio,
        to: fecha_termino
    }, function (err, quotes) {
        axios.post('http://localhost:8000/analysis', {
            n_trayectorias: trayectorias,
            riskRate: tasa_riesgo,
            values: JSON.stringify(quotes),
        }).then(res => {
            let data = res.data;
            console.log(data);
        }).catch(function (error) {
            console.error('ERROR! ' + error.message)
        })
        res.json(quotes);
    });
});

// listen server should be the last thing to do, after doing all
// the config of our back-end routes
app.listen(5000, () => console.log('App running on port 5000 🔥'));