const express = require("express");
const router = express.Router();
const control = require("../controladores/controladores")

router.get('/', control.listar)

router.post("/agregar", control.save)
module.exports = router;


// a borrar

