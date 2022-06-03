var express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const async = require('hbs/lib/async');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/login',{
      layout:'admin/layout'
  } );
});

router.post('/', async (req, res, next) =>{
  try{
    var usuario = req.body.usuario;
    var password = req.body.password;

    console.log(req.body);

    var data = await usuariosModel.getUserAndPassword(usuario, password);

    if (data !=undefined){
      res.redirect('/admin/novedades');
    } else {
      res.render('admin/login',{
        layout:'admin/layout',
        error: true
      })
    }
  } catch(error){
    console.log(error)
  }
});

module.exports = router;