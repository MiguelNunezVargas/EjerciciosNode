/*
setTimeout(() => {
    console.log("hola Mundo");
}, 3000);
*/

let getUsuarioById = (id, callback) => {
    let usuario = {
        nombre: "Miguel",
        id
    }

    if (id === 20) {
        callback(`El usuario con id ${ id }, no existe en la BD`);
    } else {
        callback(null, usuario);
    }
}

getUsuarioById(1, (err, usuario) => {
    if (err) {
        return console.log(err);
    }

    console.log('usuario de base de datos', usuario);
});