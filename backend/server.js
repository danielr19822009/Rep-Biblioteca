// npm init
// npm instal mysql express
//npm cors

const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const port = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_librarysm',
});

////////users///////////////////////////////
//instruccion para tomar los datos enviados desde el formulario con la ruta 
app.post('/add_users', (req, res) => {
    const cedula = req.body.cedula;
    const nombre = req.body.nombre;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;

    //query para enviar los datos a la base de datos
    db.query('Insert into users (cedula,nombre,direccion,telefono) values(?,?,?,?)', [cedula, nombre, direccion, telefono],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Registro Exitoso!!!!!!!");
            }
        }
    );
})


app.get('/get_users', (req, res) => {
    //query para seleccionar los datos a la base de datos
    db.query('select * from users ',
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
})


app.put('/update_users', (req, res) => {
    const id = req.body.id;
    const cedula = req.body.cedula;
    const nombre = req.body.nombre;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;

    //query para enviar los datos a la base de datos
    db.query('update users set cedula=?,nombre=?,direccion=?,telefono=? where id=?',[cedula,nombre,direccion,telefono,id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Registro Actualizado  !!!!!!!");
            }
        }
    );
})

app.delete('/delete_users/:id', (req, res) => {
    // Extraer el id de los parámetros de la solicitud
    const { id } = req.params;
    
    // Ejecutar la consulta
    db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el usuario:', err);
            return res.status(500).json({ error: 'Error al eliminar el usuario' });
        } else {
            res.json(result);
        }
    });
});
/////////////fin users ////////////////////////////////


///////////////////////editorial


///////////////////////fin editorial

app.listen(3001, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});