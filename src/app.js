const express = require("express");
const morgan = require("morgan")
const mysql = require("mysql")
const myConn = require("express-myconnection")
const app = express();
const path = require("path")


// configuraciones express
app.set("port", process.env.PORT || 3000)
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "vistas"))

//configuracion de middlewares
app.use(morgan('dev')) 
app.use(myConn(mysql,{
    host: "localhost",
    user:"root",
    password:"",
    port: 3306,
    database:"usuarios"
}))
app.use(express.urlencoded({extended:false}))

// importado de las rutas
const rutasCustomer = require("./rutas/customer");
const { urlencoded } = require("express");


//Rutas
app.use('/', rutasCustomer) // esta constante contiene las rutas


//Archivos estaticos
app.use(express.static(path.join(__dirname, "public")));

// Inicializando el servidor
app.listen(3000,()=>{
    console.log("Server en el puerto 3000")
});






