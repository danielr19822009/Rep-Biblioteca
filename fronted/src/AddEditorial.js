import React, { useState, useEffect } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./css/sb-admin-2.css";
import "./css/sb-admin-2.min.css";
import Swal from "sweetalert2";
import Axios from "axios";

// Componente para la gestión de libros
const Add_Editorial = () => {

  // Definición de estados para manejar los datos del editorial y la lista de editoriales
  const [editorialid, setEditorialId] = useState(null);
  const [nombreEditorial, setNombreEditorial] = useState('');
  const [direccionEditorial, setDireccionEditorial] = useState('');
  const [telefonoEditorial, setTelefonoEditorial] = useState('');
  const [editoriales, setEditoriales] = useState([]);

  // Función para limpiar los campos de entrada
  const limpiarCampos = () => {
    setNombreEditorial("");
    setDireccionEditorial("");
    setTelefonoEditorial(""); // Limpia el ID del autor para la edición
  };

  // Función para obtener las editoriales y autores
  const getEditoriales = () => {
    Axios.get("http://localhost:3001/get_editoriales")
      .then((response) => {
        setEditoriales(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener las Editoriales:", error);
      });
  };

  
  // Función para agregar un nuevo editorial
  const addEditorial = () => {
    if (nombreEditorial === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Uno o más campos están vacíos. ¡Verifique!",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Registrado",
        html: `<strong>${nombreEditorial}</strong>, Registrado`,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      // Realiza una solicitud POST para agregar el autor
      Axios.post("http://localhost:3001/add_editoriales", {
        nombreEditorial,
        direccionEditorial,
        telefonoEditorial,
      })
        .then(() => {
          getEditoriales(); // Actualiza la lista de editoriales
        })
        .catch((error) => {
          console.error("Hubo un error al registrar:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error al registrar la editorial.",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
          });
        });
    }
  };

  // Función para actualizar un editorial
  // Función para actualizar un autor
  const updateEditoriales = () => {
    if (!nombreEditorial || !direccionEditorial || !telefonoEditorial || !editorialid) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, complete todos los campos.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
      });
      return;
    }
    console.log(  nombreEditorial + direccionEditorial)

    Axios.put("http://localhost:3001/update_editoriales", {
      editorialId: editorialid,
      nombreEditorial,
      direccionEditorial,
      telefonoEditorial,
      
    })
      .then(() => {
        Swal.fire({
          title: "Actualizado!",
          html: `<strong>${nombreEditorial}</strong> Se ha actualizado`,
          icon: "success",
          timer: 4000,
        });
        getEditoriales(); // Actualiza la lista de autores después de la actualización
        limpiarCampos(); // Limpia los campos
      })
      .catch((error) => {
        console.error("Hubo un error al actualizar el autor:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al actualizar el autor.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
        });
      });
  };

  // Hook para cargar los autores al montar el componente
  useEffect(() => {
    getEditoriales();
  }, []);

  // Función para eliminar un editorial
  const deleteEditorial = (editorialId, nombreEditorial) => {  // Añade nombre como argumento

    Axios.delete(`http://localhost:3001/delete_editoriales/${editorialId}`)
      .then(() => {
        Swal.fire({
          title: "Eliminar!",
          html: `<strong>${nombreEditorial}</strong> se ha eliminado`,
          icon: "success",
          timer: 4000,
        });
        getEditoriales();
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar el nombre Editorial:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al eliminar el usuario.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
        });
      });
  };

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="card text-center">
          <div className="card-header">Registra Nuevo Editorial</div>
          <div className="card-body">
            <form >

            <div className="input-group mb-3">
                <span className="input-group-text">ID</span>
                <input
                  id="ideditorial"
                  type="text"
                  className="form-control"
                  readOnly
                  onChange={(event) => setEditorialId(event.target.value)}
                  value={editorialid}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Nombre</span>
                <input
                  id="nombreeditorial"
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(event) => setNombreEditorial(event.target.value)}
                  value={nombreEditorial}
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Direccion:</span>
                <input
                  id="direccioneditorial"
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(event) => setDireccionEditorial(event.target.value)}
                  value={direccionEditorial}
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Telefono:</span>
                <input
                  id="telefonoeditorial"
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(event) => setTelefonoEditorial(event.target.value)}
                  value={telefonoEditorial}
                />
              </div>
              <button type="submit" className="btn btn-block btn-primary"
              onClick={addEditorial}>Registrar</button>

            </form>
            
          </div>
        </div>
      </div>



      <hr />
      
    </div>


  );
};

export function export_addEditorial(i,nombre,direccion,telefono) { }


export default Add_Editorial;
