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