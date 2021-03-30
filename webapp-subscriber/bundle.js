(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
            datetime: oSenzor.DatumVrijeme,
            temp: oSenzor.Temperatura,
            vlaz: oSenzor.Vlaznost
        })
    })
    console.log(aSenzor)
    UcitajPodatke();
})

function UcitajPodatke() {

    aSenzor.forEach(function (oSenzor) {
        $("#table_body").append("<tr><td>" + oSenzor.datetime + "</td><td>" + oSenzor.temp + " °C</td><td>" + oSenzor.vlaz + " %</td></tr>");

    })

    $(document).ready(function () {
        table = $('#TablicaSenzor0').DataTable();
    })
};

function LiveData() {
    var client = mqtt.connect('ws://localhost/mqtt2/');
    client.on('connect', function () {
        client.subscribe('temp')
        client.subscribe('humid')
    });
    console.log('Subsciber #1 is online!');
    console.log('Receiving message...');
    client.on('message', function (topic, message) {
        context = message.toString();
        window.alert(context)
    });
}
},{}]},{},[1]);
