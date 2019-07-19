/** Async -Await */

/*
let getNombre = async() => {
    //throw new Error('No existe un nombre para ese usuario');

    return "Miguel";
}
*/

//console.log(getNombre());

/** Lo anterior es igual a :
 * let getNombre = () => {
 *      return new Promise((resolve, reject) => {
 *          resolve('Miguel');
 *   });
 * }
 */


let getNombre = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Miguel');
        }, 3000);
    });
}


let saludo = async() => {

    let nombre = await getNombre();

    return `Hola ${nombre}`
}

/*
getNombre().then(nombre => {
        console.log(nombre);
    })
    .catch(e => {
        console.log('Error de ASYNC', e);
    });
*/


saludo().then(saludo => {
    console.log(saludo);
})