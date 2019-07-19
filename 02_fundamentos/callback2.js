let empleados = [{
    id: 1,
    nombre: "Miguel"
}, {
    id: 2,
    nombre: "perro"
}, {
    id: 3,
    nombre: "gato"
}];

let salarios = [{
    id: 1,
    salario: 1000
}, {
    id: 2,
    salario: 2000
}];

let getEmpleado = (id, callback) => {

        let empleadoDB = empleados.find(empleado => empleado.id === id);

        if (!empleadoDB) {
            callback(`No existe un empleado con el id ${id}`);
        } else {
            callback(null, empleadoDB);
        }
    }
    /*
    let getSalario = (nombreEmpleado, callback) => {
        let empleadoDB = empleados.find(empleado => empleado.nombre === nombreEmpleado);

        if (empleadoDB) {
            let salarioDB = salarios.find(salario => salario.id === empleadoDB.id);
            if (!salarioDB) {
                callback(`No se encontró un salario para el usuario ${empleadoDB.nombre}`);
            } else {
                callback(null, {
                    nombre: empleadoDB.nombre,
                    salario: salarioDB.salario
                });
            }
        } else {
            callback(`No existe un usuario con el nombre ${nombreEmpleado}`);
        }
    }
    */
let getSalario = (empleado, callback) => {
    let salarioDB = salarios.find(salario => salario.id === empleado.id)

    if (!salarioDB) {
        callback(`No se encontró un salario para el usuario ${empleado.nombre}`);
    } else {
        callback(null, {
            nombre: empleado.nombre,
            salario: salarioDB.salario,
            id: empleado.id
        })
    }
}

getEmpleado(1, (err, empleado) => {
    if (err) {
        return console.log(err);
    }

    getSalario(empleado, (err, resp) => {
        if (err) {
            return console.log(err);
        }

        console.log(`El salario de ${resp.nombre} es de ${resp.salario}$`);

    });



});





/*
getSalario('gato', (err, salario) => {
    if (err) {
        return console.log(err);
    }
    console.log(salario);
});
*/