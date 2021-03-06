/**
 * Puerto
 */
process.env.PORT = process.env.PORT || 3000;

/**
 * Entorno
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**
 * Vencimiento token
 */
process.env.CADUCIDAD_TOKEN = '48h';


/**
 * SEED de autentificacion
 */
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


/**
 * Base de datos
 */
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.urlDB = urlDB;


/**
 * Google Client ID
 * 
 */
process.env.CLIENT_ID = process.env.CLIENT_ID || '130305850084-5thit27s6m32isrvrprb9cl59q54ej5d.apps.googleusercontent.com';