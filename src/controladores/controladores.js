const controladorDeAcciones = {}
const { body,validationResult } = require("express-validator");


controladorDeAcciones.listar = (req,res) =>{
    
    req.getConnection(function(err,conn){
        conn.query("SELECT * FROM empleados", (err,rows) =>{
            res.render("usuarios.ejs",{data: rows})
        })
    })
};
  
controladorDeAcciones.saveupdate = (req,res) =>{
    const id = req.params
    const NuevosDatos = req.body
    console.log(NuevosDatos)
    console.log(id.id)
    req.getConnection((err,conn)=>{
        conn.query('UPDATE empleados set ? WHERE id_empleados = ?',[NuevosDatos,id.id], (err,rows) =>{
            res.redirect("/")
        })
    })
}

controladorDeAcciones.update = (req,res) =>{
    let id = req.params
    req.getConnection((err,conn) =>{
        conn.query(`SELECT * FROM empleados WHERE id_empleados = ${id.id}`,(err,rows)=>{
            res.render("editusuarios.ejs",({data:rows[0]}))
        })
    })
}

controladorDeAcciones.save = (req,res) =>{
    const data = req.body
    req.getConnection((err,conn) =>{
        conn.query("INSERT INTO empleados set ?",[data])
    })
    res.redirect("/")
}

controladorDeAcciones.delete = (req,res) =>{
    let id = req.params.id
    req.getConnection((err,conn)=>{
        conn.query(`DELETE FROM empleados WHERE id_empleados = ${id}`)
        res.redirect("/")
    })
    
}

//acciones para redireccion a VISTAS DE SUCURSALES

controladorDeAcciones.sucursal = (req,res) =>{
    req.getConnection((err,conn)=>{
        conn.query("SELECT S.NOMBRE AS SUCURSAL,E.NOMBRE AS NOMBRE_EMPLEADO,E.APELLIDO AS APELLIDO_EMPLEADO FROM SUCURSALES AS S JOIN EMPLEADOS AS E ON E.ID_SUCURSAL = S.ID WHERE E.ID_SUCURSAL = 1;",(err,rows)=>{
            res.render("sucursales.ejs",{data:rows})
            console.log(rows)
        })
    })
}

controladorDeAcciones.sucursal1 = (req,res) =>{
    req.getConnection((err,conn)=>{
        conn.query("SELECT S.NOMBRE AS SUCURSAL,E.NOMBRE AS NOMBRE_EMPLEADO,E.APELLIDO AS APELLIDO_EMPLEADO FROM SUCURSALES AS S JOIN EMPLEADOS AS E ON E.ID_SUCURSAL = S.ID WHERE E.ID_SUCURSAL = 2;",(err,rows)=>{
            res.render("sucursales.ejs",{data:rows})
            console.log(rows)
        })
    })
}

controladorDeAcciones.sucursal2 = (req,res) =>{
    req.getConnection((err,conn)=>{
        conn.query("SELECT S.NOMBRE AS SUCURSAL,E.NOMBRE AS NOMBRE_EMPLEADO,E.APELLIDO AS APELLIDO_EMPLEADO FROM SUCURSALES AS S JOIN EMPLEADOS AS E ON E.ID_SUCURSAL = S.ID WHERE E.ID_SUCURSAL = 3;",(err,rows)=>{
            res.render("sucursales.ejs",{data:rows})
            console.log(rows)
        })
    })
}

controladorDeAcciones.sucursal3 = (req,res) =>{
    req.getConnection((err,conn)=>{
        conn.query("SELECT S.NOMBRE AS SUCURSAL,E.NOMBRE AS NOMBRE_EMPLEADO,E.APELLIDO AS APELLIDO_EMPLEADO FROM SUCURSALES AS S JOIN EMPLEADOS AS E ON E.ID_SUCURSAL = S.ID WHERE E.ID_SUCURSAL = 5;",(err,rows)=>{
            res.render("sucursales.ejs",{data:rows})
        })
    })
}

//PRUEBA (ESPERO NO SE ROMPA) XD

controladorDeAcciones.prueba = () =>{
    [body("nombre", "Ingrese un nombre de minimo 4 caracteres y sin numeros").exists().isAlpha().isLength({min:4}),
    body("apellido","ingrese un apellido de minimo 4 caracteres y sin numeros").exists().isAlpha().isLength({min:4}),
    body("edad","ingrese una edad en formato num??rico").exists().isNumeric(),
    body("id_sucursal","ingrese un id_sucursal en formato numero").exists().isNumeric()], (req,res) =>{
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
        }
    }


module.exports = controladorDeAcciones