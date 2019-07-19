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

/* versión antigua 
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
 */
/* Versión Nueva */
let getEmpleado = async(id) => {
    let empleadoDB = empleados.find(empleado => empleado.id === id);
    if (!empleadoDB) {
        throw new Error(`No existe un empleado con el ID ${id}`);
    } else {
        return empleadoDB;
    }

}

/* let getSalario = (empleado) => {
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
} */

/* Versión Nueva */
let getSalario = async(empleado) => {
    let salarioDB = salarios.find(salario => salario.id === empleado.id);
    if (!salarioDB) {
        throw new Error(`No se encontró un salario para el usuario ${empleado.nombre}`);
    } else {
        return ({
            nombre: empleado.nombre,
            salario: salarioDB.salario,
            id: empleado.id
        });
    }

}



/* Encadenar promesas v2*/
/* getEmpleado(3).then(empleado => {
    return getSalario(empleado);
})
.then(resp => {
    console.log(`El salario de ${resp.nombre} es de ${resp.salario}$`);
})
.catch(err => {
    console.log(err);
})
 */


let getInformacion = async(id) => {
    let empleado = await getEmpleado(id);
    let salario = await getSalario(empleado);
    return `${ salario.nombre} tiene un salario de ${salario.salario}$`
        //console.log(salario);
}

getInformacion(1)
    .then(mensaje => console.log(mensaje))
    .catch(err => console.log(err));