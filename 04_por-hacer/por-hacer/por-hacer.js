const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`db/data.json`, data, (err) => {
        if (err)
            throw new Error('No se pudo Grabar', err);
    });
}

const cargarDb = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {
    cargarDb();

    let porHacer = {
        descripcion, //en ECMAscript6 remplaza a lo que sería : descripcion:descripcion
        completado: false
    }
    listadoPorHacer.push(porHacer);
    guardarDB();

    return porHacer;
}

const listar = (completado = false) => {
    cargarDb();

    if (completado) {
        let nuevoListado = listadoPorHacer.filter(tarea => {
            return tarea.completado !== false;
        });
        listadoPorHacer = nuevoListado;
    }

    return listadoPorHacer;
}


const actualizar = (descripcion, completado = true) => {
    cargarDb();
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDb();
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion;
    });

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    listar,
    actualizar,
    borrar
}