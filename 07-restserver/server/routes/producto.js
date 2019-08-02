const express = require('express');
const { verificaToken } = require('../middlewares/autenticacion');

let app = express();
const Producto = require('../models/producto');
const Categoria = require('../models/categoria');

/*============================
 * Obtener todos los productos
 =============================*/
 app.get('/productos', verificaToken,(req, res) => {
    let desde = req.query.desde || 0;
    let limite = req.query.limite || 5;
    desde = Number(desde);
    limite = Number(limite);

    Producto.find({}, 'nombre precioUni')
        .sort('nombre')
        .populate('categoria', 'descripcion')
        .populate('usuario', 'nombre email')
        .skip(desde)
        .limit(limite)
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Producto.countDocuments({}, (err, conteo) => {
                res.json({
                    ok: true,
                    productos,
                    cuantos: conteo
                })
            })
        }
    );
 });


/*============================
 * Obtener un producto por id
 =============================*/
 app.get('/productos/:id', (req, res) => {
    //populate: usuario categoria
    let idProducto = req.params.id;

    Producto.find({_id: idProducto}, 'nombre precioUni')
        .populate('categoria', 'descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            if (!productos) {
                return res.status(400).json({
                    ok: false,
                    message: "No existe el id de producto"
                });
            }

            res.json({
                ok: true,
                productos
            })            
        }
    );
    
 });


/*============================
 * Crear un nuevo producto
 =============================*/
 app.post('/productos/',verificaToken,(req, res) => {
    let body = req.body;
    /**Guardamos el producto */
    Categoria.findById(body.idCategoria, (err, categoriaDB) => {      
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                message: "Id De categoria incorrecto"
            });
        }
        
        let producto = new Producto({
            nombre: body.nombre,
            precioUni: body.precioUni,
            descripcion: body.descripcion,
            categoria: body.idCategoria,
            usuario: req.usuario._id            
        });
    
        producto.save((err, productoDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
    
            res.json({
                ok: true,
                producto: productoDB
            })
        });
    });
 });


/*============================
 * Actualizar un  producto
 =============================*/
 app.put('/productos/:id', (req, res) => {
    //grabar el usuario
    //grabar una categoria
 });


/*============================
 * Borrar un producto
 =============================*/
 app.delete('/productos/:id', (req, res) => {
    //grabar el usuario
    //grabar una categoria
    //borrar logicamente (disponible)
 });




module.exports = app;