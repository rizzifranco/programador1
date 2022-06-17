var express = require('express');
const pool = require('../../models/bd');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');
var util = require('util');
var cloudinary = require('cloudinary').v2;
var uploader = util.promisify(cloudinary.uploader.upload);

/* GET home page. */
router.get('/',async function(req, res, next) {

  var novedades = await novedadesModel.getNovedades();

  res.render('admin/novedades',{
      layout:'admin/layout',
      nombre: req.session.nombre,
      novedades
  } );
});

router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;
  await novedadesModel.deleteNovedadesById(id);
  res.redirect('/admin/novedades')
});

router.get('/agregar', (req, res, next) =>{
  res.render('admin/agregar',{
    layout: 'admin/layout'
  })
});

router.post('/agregar', async (req, res, next) =>{

  //console.log(req.body)
  try {
    var img_id = "";
    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilePath)).public_id;
    }

    if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != ""){
      await novedadesModel.insertNovedad({
        ...req.body,
        img_id
    });
      res.redirect('/admin/novedades')
    } else {
      res.render('admin/agregar',{
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son requeridos'
      })
    }
  } catch(error){
    console.log(error)
    res.render('admin/agregar',{
      layout: 'admin/layout',
      error: true,
      message: 'No se cargo la novedad'
    })
  }
});

router.get('/modificar/:id', async (req, res, next) => {
  var id = req.params.id;
  var novedad = await novedadesModel.getNovedadById(id);

  res.render('admin/modificar', {
    layout: 'admin/layout',
    novedad
  });
});


router.post('/modificar', async (req, res, next) => {
  try {
   //console.log(req.body.id);
   //console.log(req.body);
    var obj = {
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo
    }
    //console.log(obj)
    await novedadesModel.modificarNovedadById(obj, req.body.id);
    res.redirect('/admin/novedades');
  } catch (error) {
    console.log(error)
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se modifico la novedad'
    })
  }
});

module.exports = router;