const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const fs = require('fs');
const path = require('path');

//Models
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');


//uso de file Upload
app.use( fileUpload({ useTempFiles: true }));

//Subimos Archivos
app.put('/upload/:tipo/:id', (req, res) => {
    
    let tipo = req.params.tipo;
    let id = req.params.id;


    /* Si no vienen archivos */
    if(!req.files){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha seleccionado ningún archivo'
            }
        });
    }

    //valida tipo
    let tiposValidos = ['productos', 'usuarios'];
    if(tiposValidos.indexOf(tipo) <0){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Los tipos permitidos son: ' + tiposValidos.join(', '),
                tipoEnviado: tipo
            }
        });
    }


    /* Si vienen archivos */
    let archivo = req.files.archivo; //archivo es el nombre del input que está enviando, el nombre del campo file

    //Extensiones permitidas
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
    let nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length -1];
    
    if(extensionesValidas.indexOf(extension) <0){
        // No lo encuentra en el array permitido
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Las extensiones validas son: ' + extensionesValidas.join(', '),
                ext: extension
            }
        });
    }

    // Cambiar nombre del archivo
    let nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ extension }`

    archivo.mv(`uploads/${ tipo }/${ nombreArchivo }`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        
        //la img se cargó
        if( tipo === "usuarios"){
            imagenUsuario(id, res, nombreArchivo);
        }else{
            imagenProducto(id, res, nombreArchivo);
        }
           
    });

});

/**Usuarios */
function imagenUsuario(id, res, nombreArchivo){
    Usuario.findById(id, (err, usuarioDB) =>{
        if (err) {
            borraArchivo(usuarioDB.img, 'usuarios');
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if(!usuarioDB){
            borraArchivo(nombreArchivo, 'usuarios');
            return res.status(400).json({
                ok: false,
                err:{
                    message: 'El usuario no existe'
                }
            });
        }

        borraArchivo(usuarioDB.img, 'usuarios');

        /** El usuario existe, actualizamos su img */
        usuarioDB.img = nombreArchivo;
        usuarioDB.save( (err, usuarioGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            };

            res.json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo
            });

        });

    });
}

/**Productos */
function imagenProducto(id, res, nombreArchivo){
    Producto.findById(id, (err, productoDB) =>{
        if (err) {
            borraArchivo(productoDB.img, 'productos');
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if(!productoDB){
            borraArchivo(nombreArchivo, 'usuarios');
            return res.status(400).json({
                ok: false,
                err:{
                    message: 'El producto no existe'
                }
            });
        }

        borraArchivo(productoDB.img, 'productos');

        /** El producto existe, actualizamos su img */
        productoDB.img = nombreArchivo;
        productoDB.save( (err, productoGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            };

            res.json({
                ok: true,
                producto: productoGuardado,
                img: nombreArchivo
            });
        });


    });

}

function borraArchivo(nombreImagen, tipo){
    let pathImagen = path.resolve(__dirname, `../../uploads/${ tipo }/${ nombreImagen }`);
    if( fs.existsSync(pathImagen) ){
        fs.unlinkSync(pathImagen);
    }
}

module.exports = app;