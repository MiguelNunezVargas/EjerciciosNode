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


let getEmpleado = (id) => {
    return new Promise((resolve, reject) => {
        let empleadoDB = empleados.find(empleado => empleado.id === id);

        if (!empleadoDB) {
            reject(`No existe un empleado con el ID ${id}`);
        } else {
            resolve(empleadoDB);
        }
    });
}


let getSalario = (empleado) => {
    return new Promise((resolve, reject) => {
        let salarioDB = salarios.find(salario => salario.id === empleado.id);

        if (!salarioDB) {
            reject(`No se encontró un salario para el usuario ${empleado.nombre}`);
        } else {
            resolve({
                nombre: empleado.nombre,
                salario: salarioDB.salario,
                id: empleado.id
            });
        }
    });
}

/*encadenar promesas v1
getEmpleado(1).then(empleado => {
    getSalario(empleado).then(resp => {
        console.log(`El salario de ${resp.nombre} es de ${resp.salario}$`);
    }, (err) => {
        console.log(err);
    });
}, (err) => {
    console.log(err);
});
*/



/* Encadenar promesas v2*/
getEmpleado(3).then(empleado => {
        return getSalario(empleado);
    })
    .then(resp => {
        console.log(`El salario de ${resp.nombre} es de ${resp.salario}$`);
    })
    .catch(err => {
        console.log(err);
    })