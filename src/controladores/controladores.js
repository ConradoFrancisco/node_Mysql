const controladorDeAcciones = {}

controladorDeAcciones.listar = (req,res) =>{
    req.getConnection(function(err,conn){
        conn.query("SELECT * FROM usuarios", (err,rows) =>{
            res.render("usuarios.ejs",{data: rows})
        })
    })
};
   

controladorDeAcciones.save = (req,res) =>{
    const data = req.body
    req.getConnection((err,conn) =>{
        conn.query("INSERT INTO usuarios set ?",[data])
    })
    res.redirect("/")
}

module.exports = controladorDeAcciones