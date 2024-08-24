// npm init
// npm instal mysql express

const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_librarysm',
});


//instruccion para tomar los datos enviados desde el formulario con la ruta 
    app.post('/createusers',(req,res) => {
        const cedula =req.body.cedula;
        const nombre =req.body.nombre;
        const direccion =req.body.direccion;
        const telefono =req.body.telefono;
        
        //query para enviar los datos a la base de datos
        db.query('Insert into users (cedula,nombre,direccion,telefono) values(?,?,?,?)', [cedula,nombre,direccion,telefono],
        (err,result) => {
                if (err) {
                    console.log(err);
                }else {
                    res.send("Registro Exitoso!");
                }
            } 
        );
    })

app.listen(3001,()=>{
   console.log("te escucho port 3001");
});