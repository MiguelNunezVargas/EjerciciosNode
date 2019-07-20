const fs = require('fs'); //propio en node
const colors = require('colors');


//module.exports.crearArchivo = (base) => { tb es válida

let listarTabla = (base, limite = 10) => {
    if (!Number(base)) {
        reject(`El valor introducido ${base} no es un número`);
        return;
    }

    if (!Number(limite)) {
        reject(`El valor introducido ${limite} no es un número`);
        return;
    }

    console.log('==============================='.green);
    console.log(`Tabla de ${base}`.green);
    console.log('==============================='.green);


    for (let i = 1; i <= limite; i++) {
        console.log(`${base} * ${i} = ${base * i} \n`);
    }
}


let crearArchivo = (base, limite = 10) => {
    return new Promise((resolve, reject) => {
        if (!Number(base)) {
            reject(`El valor introducido ${base} no es un número`);
            return;
        }

        if (!Number(limite)) {
            reject(`El valor introducido ${limite} no es un número`);
            return;
        }

        let data = '';

        for (let i = 1; i <= limite; i++) {
            data += `${base} * ${i} = ${base * i} \n`;

        }

        fs.writeFile(`tablas/tabla-${base}-al-${limite}.txt`, data, (err) => {
            if (err)
                reject(err);
            else
                resolve(colors.green(`tabla-${ base }-al-${limite}.txt`));
        });
    });
}


module.exports = {
    crearArchivo,
    listarTabla
}