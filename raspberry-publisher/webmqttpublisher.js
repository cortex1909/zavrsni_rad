var mqtt = require('mqtt');
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
var client = mqtt.connect('mqtt://192.168.1.20');
var sensor = require('node-dht-sensor');

const firebaseConfig = {
    apiKey: "AIzaSyDyNdsLzJ14AaycXk0O0nuOgQH92Sog7u4",
    authDomain: "raspberry-sensors.firebaseapp.com",
    databaseURL: "https://raspberry-sensors-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "raspberry-sensors",
    storageBucket: "raspberry-sensors.appspot.com",
    messagingSenderId: "465842400670",
    appId: "1:465842400670:web:85a4de277e5db767707a8f",
    measurementId: "G-P7RMGYRXE2"
};

firebase.initializeApp(firebaseConfig);

let oDb = firebase.database();
let aSenzor = [];
let oDbsenzor0 = oDb.ref('ts0');
oDbsenzor0.on('value', function (oOdgovorPosluzitelja) {
    aSenzor = [];
    oOdgovorPosluzitelja.forEach(function (oSenzorSnapshot) {
        let oSenzor = oSenzorSnapshot.val();
        aSenzor.push({
            DatumVrijeme: aSenzor.datetime,
            Temperatura: aSenzor.temperatura,
            Vlaznost: aSenzor.vlaznost
        })
    })
})

client.on('connect', function () {
    console.log('Publisher is online!');
    setInterval(function () {
        sensor.read(11, 4, function (err, temperature, humidity) {

            if (!err) {
                client.publish('temp', 'Trenutna temperatura je: ' + temperature);
                client.publish('humid', 'Trenutna vlaznost zraka je: ' + humidity);

                console.log('Temperatura: ' + temperature + ' Vlaga: ' + humidity);
            } else {
                console.log('Desila se pogreska: ' + err);
            }
        })
    }, 5000);
})


setInterval(function () {
    sKey = firebase.database().ref().child('ts0').push().key;
    let nDatumVrijeme;
    let nTemperatura;
    let nVlaznost;
    let currentdate = new Date();
    let datetime = currentdate.getDate() + "/" +
        (currentdate.getMonth() + 1) + "/" +
        currentdate.getFullYear() + " " +
        currentdate.getHours() + ":" +
        addZero(currentdate.getMinutes()) + ":" +
        addZero(currentdate.getSeconds());

    sensor.read(11, 4, function (err, temperature, humidity) {

        if (!err) {
            client.publish('temp', 'Trenutna temperatura je: ' + temperature);
            client.publish('humid', 'Trenutna vlaznost zraka je: ' + humidity);

            oSenzor = {
                DatumVrijeme: datetime,
                Temperatura: temperature,
                Vlaznost: humidity
            };

            let oZapis = {};
            oZapis[sKey] = oSenzor;
            oDbsenzor0.update(oZapis);
            console.log(oZapis);

            console.log('Temperatura: ' + temperature + ' Vlaga: ' + humidity);
        } else {
            console.log('Desila se pogreska: ' + err);
        }
    });
    console.log('Message sent!');
}, 1800000);


function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}