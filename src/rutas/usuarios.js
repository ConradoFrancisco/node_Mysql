const express = require("express");
const { body,validationResult } = require("express-validator");
const router = express.Router();
const control = require("../controladores/controladores")
const app = require("../app");
const { render } = require("../app");


router.get('/', control.listar)

router.post("/agregar",[
    body("nombre","ingrese un nombre valido sin numeros")
    .exists()
    .isLength({min:4}).isAlpha(),
    body("apellido","ingrese un apellido valido, sin numeros y un minimo de 4 caracteres")
    .exists()
    .isLength({min:4}),
    body("edad","Ingrese una Edad valida en formato Numérico")
    .exists()
    .isNumeric(),
    body("id_sucursal","ingrese un valor en el campo id_sucursal en formato numérico ").exists().isNumeric()
],(req,res)=>{
    const errors = validationResult(req);
    const data = req.body
    if (!errors.isEmpty()) {
        const valores = req.body
        const validaciones = errors.array()
        console.log(validaciones)
        req.getConnection(function(err,conn){
            conn.query("SELECT * FROM empleados", (err,rows) =>{
                res.render("usuarios.ejs",{data: rows,validaciones:validaciones, valores:valores})
            })
        });
        
    }else{
        
        req.getConnection((err,conn) =>{
        conn.query("INSERT INTO empleados set ?",[data])
    })
    res.redirect("/")
    }
})

router.get("/delete/:id", control.delete)

router.get("/update/:id", control.update)

router.post("/update/:id", control.saveupdate)

router.get("/sucursal", control.sucursal)

router.get("/sucursal1", control.sucursal1)

router.get("/sucursal2", control.sucursal2)

router.get("/sucursal3", control.sucursal3)

module.exports = router;




