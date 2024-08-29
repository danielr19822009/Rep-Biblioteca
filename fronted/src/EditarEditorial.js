import React, { useState, useEffect } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./css/sb-admin-2.css";
import "./css/sb-admin-2.min.css";
import Swal from "sweetalert2";
import Axios from "axios";

// Componente para la gestión de libros
const Editar_Editorial = () => {

  // Definición de estados para manejar los datos del editorial y la lista de editoriales
  const [editorialid, setEditorialId] = useState('');
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
      
      <hr />
      <div id="tabladatos" className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 id='titablausers' className="m-0 font-weight-bold text-primary">Editoriales</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Editorial</th>
                  <th scope="col">Direccion</th>
                  <th scope="col">telefono</th>
                  <th scope="col">Opciones</th>
                </tr>
              </thead>
              <tbody>
                {editoriales.map((editorial) => (
                  <tr key={editorial.editorialId}>
                    <td>{editorial.editorialId}</td>
                    <td>{editorial.nombreEditorial}</td>
                    <td>{editorial.direccionEditorial}</td>
                    <td>{editorial.telefonoEditorial}</td>

                    <td className="opciones">
                      <div className="btn-group" role="group">
                        <button
                          type="button"
                          className="btn btn-info" data-bs-toggle="modal" data-bs-target="#Modaleditorial"
                          onClick={() => {
                            setNombreEditorial(editorial.nombreEditorial);
                            setDireccionEditorial(editorial.direccionEditorial);
                            setTelefonoEditorial(editorial.telefonoEditorial); // Establece el ID del editoriaal para editar
                          }}
                        >Editar
                        </button>
                        <button
                          type="button" className="btn btn-danger"
                          onClick={() => deleteEditorial(editorial.editorialId)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal para editar */}
      <div className="modal fade" id="Modaleditorial" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">EDITAR Editorial</h5>
            </div>
            <div className="modal-body">
              <form onSubmit={(event) => { event.preventDefault(); updateEditoriales(); }}>
               
                <div className="input-group mb-3">
                  <span className="input-group-text">Nombre</span>
                  <input
                    id="nombreeditorial"
                    type="text"
                    className="form-control"
                    onChange={(event) => setNombreEditorial(event.target.value)}
                    value={nombreEditorial}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Dirección</span>
                  <input
                    id="direedito"
                    type="text"
                    className="form-control"
                    onChange={(event) => setDireccionEditorial(event.target.value)}
                    value={direccionEditorial}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Teléfono</span>
                  <input
                    id="teleedito"
                    type="text"
                    className="form-control"
                    onChange={(event) => setTelefonoEditorial(event.target.value)}
                    value={telefonoEditorial}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary" onClick={(event) => { event.preventDefault(); updateEditoriales(); }}>Actualizar</button>
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>


  );
};

export function export_addEditorial(i,nombre,direccion,telefono) { }


export default Editar_Editorial;
