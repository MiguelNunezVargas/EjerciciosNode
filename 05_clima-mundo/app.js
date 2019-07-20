const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciudad para obtener el clima',
        demand: true
    }
}).argv;

//argv.direccion


/*
lugar.getLugarLatLng(argv.direccion)
    .then(console.log)
    .catch(console.log)
*/
/*
clima.getClima(-33.459999, -70.639999)
    .then(console.log)
    .catch(console.log);

*/

const getInfo = async(direccion) => {
    try {
        const ciudad = await lugar.getLugarLatLng(direccion);
        const temperatura = await clima.getClima(ciudad.lat, ciudad.lng);
        return `El clima de ${direccion} es  de ${temperatura}`;
    } catch (e) {
        return `No se pudo determinar el clima de ${direccion} `;
    }
}


getInfo(argv.direccion)
    .then(console.log)
    .catch(console.log)