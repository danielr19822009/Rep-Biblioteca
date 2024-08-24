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



app.put('/update_users', (req, res) => {
    const id = req.body.id;
    const cedula = req.body.cedula;
    const nombre = req.body.nombre;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;

    //query para enviar los datos a la base de datos
    db.query('update users set cedula=?,nombre=?,direccion=?,telefono=? where usuarioId=?', [cedula, nombre, direccion, telefono, id],
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
    db.query('DELETE FROM users WHERE usuarioId = ?', [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el usuario:', err);
            return res.status(500).json({ error: 'Error al eliminar el usuario' });
        } else {
            res.json(result);
        }
    });
});

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

/////////////fin users ////////////////////////////////


///////////////////////Autor

// Agregar un autor
app.post('/add_autores', (req, res) => {
    const nombreAutor  = req.body.nombreAutor;
    const apellidoAutor = req.body.apellidoAutor;
    console.log('Autor', 'Autor');
    db.query('INSERT INTO autor (nombreAutor, apellidoAutor) VALUES (?, ?)', [nombreAutor, apellidoAutor], (err, result) => {
        if (err) {
            console.error('Error al agregar el autor:', err);
            res.status(500).send('Error al agregar el autor');
        } else {
            res.send('Autor agregado exitosamente');
        }
    });
});

app.get('/get_autores', (req, res) => {
    //query para seleccionar los datos a la base de datos
    db.query('select * from autor ',
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
})
// Endpoint para actualizar un autor
app.put('/update_autor', (req, res) => {
    const { autorId, nombreAutor, apellidoAutor } = req.body;
    db.query('UPDATE autor SET nombreAutor = ?, apellidoAutor = ? WHERE autorId = ?', [nombreAutor, apellidoAutor, autorId],
      (err, result) => {
        if (err) {
          console.error('Error al actualizar el autor:', err);
          return res.status(500).send('Error al actualizar el autor.');
        }
        if (result.affectedRows === 0) {
          return res.status(404).send('Autor no encontrado.');
        }
        res.send('Autor actualizado con éxito.');
      }
    );
  });
  
  // Endpoint para eliminar un autor
  app.delete('/delete_autor/:autorId', (req, res) => {
    const autorId = req.params.autorId;
  
    db.query(
      'DELETE FROM autor WHERE autorId = ?',
      [autorId],
      (err, result) => {
        if (err) {
          console.error('Error al eliminar el autor:', err);
          return res.status(500).send('Error al eliminar el autor.');
        }
        if (result.affectedRows === 0) {
          return res.status(404).send('Autor no encontrado.');
        }
        res.send('Autor eliminado con éxito.');
      }
    );
  });
  
///////////////////////fin Autor


////EDITORIALES      
// Endpoint get editorial

app.get('/get_editoriales', (req, res) => {
    //query para seleccionar los datos a la base de datos
    db.query('select * from editorial ',
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
})
// Endpoint ADD editorial
app.post('/add_editoriales', (req, res) => {
    const nombreEditorial  = req.body.nombreEditorial;
    const direccioEditorial = req.body.direccioEditorial;
    const telefonoEditorial = req.body.telefonoEditorial;

    db.query('INSERT INTO editorial (nombreEditorial, direccioEditorial,telefonoEditorial) VALUES (?, ?, ?)', [nombreEditorial, direccioEditorial, telefonoEditorial], (err, result) => {
        if (err) {
            console.error('Error al agregar el editorial:', err);
            res.status(500).send('Error al agregar el editorial');
        } else {
            res.send('editorial agregado exitosamente');
        }
    });
});

app.listen(3001, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});