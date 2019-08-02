const express = require('express');
const _ = require('underscore');

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let app = express();

const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');


/**=============================
 * Mostrar Todas las categorias
 =============================*/
app.get('/categoria',verificaToken,(req, res) =>{
    let desde = req.query.desde || 0;
    let limite = req.query.limite || 5;
    desde = Number(desde);
    limite = Number(limite);

    Categoria.find({}, 'descripcion')
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .skip(desde)
        .limit(limite)
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Categoria.countDocuments({}, (err, conteo) => {
                res.json({
                    ok: true,
                    categorias,
                    cuantos: conteo
                })
            })
        }
    );

});

/**=============================
 * Mostrar una categoría por ID
 =============================*/
 app.get('/categoria/:id',verificaToken,(req, res) =>{
    let idCategoria = req.params.id;
    
    Categoria.findById(idCategoria, (err, categoriaDB) => {      
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                message: "No existe el id de categoria"
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

/**=============================
 * Crear Nueva Categoria
 =============================*/
 app.post('/categoria',verificaToken, (req, res) =>{
    let idUsuario = req.usuario._id;
    let body = req.body;

    /**Guardamos la categoria */
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id        
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        })
    });
   
});

/**=============================
 * Editar una categoria
 =============================*/
 app.put('/categoria/:id',verificaToken,(req, res) =>{
    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion']);

    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true, useFindAndModify: false}, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                message: "No existe el id de categoria"
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });
});

/**=============================
 * Eliminar Categoria
 =============================*/
 app.delete('/categoria/:id',[verificaToken, verificaAdmin_Role] ,(req, res) =>{
    //Solo un admin puede borrar categorias (Borrado físico)
    //debe pedir el token
    
    let id = req.params.id;
    /**para Removerlo Físicamente */
    Categoria.findByIdAndRemove(id, (err, categoriaBorrada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!categoriaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoria no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaBorrada
        })
    });

});

module.exports = app;