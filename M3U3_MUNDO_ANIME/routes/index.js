var express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const async = require('hbs/lib/async');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post( '/' , async(req, res, next) => {
  var correo = req.body.correo;
  var nombre = req.body.nombre;
  var clave = req.body.clave;
  var clave2 = req.body.clave2;

  console.log(req.body);

  var obj = {
    to: 'rizzi.franco90@gmail.com',
    subject: 'NUEVA MEMBRESIA MUNDO ANIME',
    html: nombre + " se contacto a travez de la web y quiere una membresia en mundo anime su correo es :" + correo + " <br> Sus contrañeas son : " + clave +  " <br> su confirmacion es :" + clave2
    }
var transport = nodemailer.createTransport ({
     host: process.env.SMTP_HOST,
     port: process.env.SMTP_PORT,
     auth: {
       user: process.env.SMTP_USER,
       pass: process.env.SMTP_PASS
     }
});

var info = await transport.sendMail(obj);

res.render('index', {
  message: 'Mensaje enviado correctamente'
});

});

module.exports = router;
