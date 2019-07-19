const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
};

const completado = {
    alias: 'c',
    default: true,
    desc: 'Marca como completado o pendiente la tarea'
};

const completadoListar = {
    alias: 'c',
    default: false,
    desc: 'Completado para listar'
};


const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        descripcion,
        completado
    })
    .command('listar', 'Lista de todos los elementos pendientes', {
        completadoListar
    })
    .command('borrar', 'Elimina un elemento de la lista', {
        descripcion
    })
    .help()
    .argv;

module.exports = {
    argv
}