/*
function sumar(a, b) {
    return a + b;
}
*/
//let sumar = (a, b) => a + b;
//console.log(sumar(10, 20));
/*
function saludar() {
    return "hola Mundo";
}
*/
//let saludar = () => "Hola Mundo";

/*
function saludar(nombre) {
    return `Hola ${nombre}`;
}
*/
/*
let saludar = (nombre) => `Hola ${nombre}`;
console.log(saludar("Miguel"));
*/

let deadpool = {
    nombre: "Wade",
    apellido: "Winston",
    poder: "regeneración",
    getNombre() {
        return `${this.nombre} ${this.apellido} - poder: ${this.poder}`;
    }
}

console.log(deadpool.getNombre());