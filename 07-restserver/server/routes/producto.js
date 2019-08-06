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

    Producto.find({ disponible: true }, 'nombre precioUni')
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
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
                });
            });
        }
    );
 });


/*============================
 * Obtener un producto por id
 =============================*/
 app.get('/productos/:id',verificaToken, (req, res) => {
    //populate: usuario categoria
    let idProducto = req.params.id;

    Producto.find({_id: idProducto}, 'nombre precioUni')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
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
 * Buscar Productos
 =============================*/
app.get('/productos/buscar/:termino', verificaToken, (req, res) =>{

    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'descripcion')
        .exec( (err, productos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
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
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
    
            res.status(201).json({
                ok: true,
                producto: productoDB
            })
        });
    });
 });


/*============================
 * Actualizar un  producto
 =============================*/
 app.put('/productos/:id',verificaToken, (req, res) => {
    //grabar el usuario
    //grabar una categoria
    let id = req.params.id;
    let body = req.body;

    Producto.findById(id, (err, productoDB) =>{
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;
        productoDB.descripcion = body.descripcion;

        productoDB.save((err, productoGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
    
            res.status(201).json({
                ok: true,
                producto: productoGuardado
            })
        });

    });


 });


/*============================
 * Borrar un producto
 =============================*/
 app.delete('/productos/:id',verificaToken, (req, res) => {
    /* id que llega desde los parametros */
    let id = req.params.id;
    
    /**Para Removerlo lógicamente */
    let body = {
        disponible: false,
        usuario: req.usuario._id
        //categoria: req.body.categoria
    }

    //Producto.findById(id, (err, productoDB) => {});

    Producto.findByIdAndUpdate(id, body, { new: true }, (err, productoBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!productoBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        res.json({
            ok: true,
            producto: productoBorrado,
            mensaje: 'Producto Borrado'
        });

    });

 });




module.exports = app;