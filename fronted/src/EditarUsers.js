import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./css/sb-admin-2.css";
import "./css/sb-admin-2.min.css";

import Swal from "sweetalert2";
import Axios from "axios";

const Editar_User = () => {
  const [usuarioid, setusuarioid] = useState("");
  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");

  const [usersList, setUsersList] = useState([]);
  const [editar, setEditar] = useState(false); ///banderita

  // Function to get users
  const getUsers = () => {
    Axios.get("http://localhost:3001/get_users")
      .then((response) => {
        setUsersList(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los usuarios:", error);
      });
  };

  // Clear input fields
  const clear = () => {
    setusuarioid("");
    setCedula("");
    setNombre("");
    setDireccion("");
    setTelefono("");
    setEditar(false); //banderita
  };

  // Function to update user
  const updateUser = () => {
    if (usuarioid) {
      Axios.put("http://localhost:3001/update_users", {
        usuarioid,
        cedula,
        nombre,
        direccion,
        telefono,
      })
        .then(() => {
          Swal.fire({
            title: "Actualizado!",
            html: `<strong> ${nombre}  </strong>Se Ha Actualizado`,
            icon: "success",
            timer: 4000,
          });
          getUsers();
          clear();
        })
        .catch((error) => {
          console.error("Hubo un error al actualizar el usuario:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error al actualizar el usuario.",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se ha seleccionado ningún usuario para actualizar.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
      });
    }
  };

  //funcion delete users
  const deleteUser = (id, nombre) => {
    // Añade nombre como argumento
    Axios.delete(`http://localhost:3001/delete_users/${id}`)
      .then(() => {
        Swal.fire({
          title: "Eliminar!",
          html: `<strong>${nombre}</strong> se ha eliminado`,
          icon: "success",
          timer: 4000,
        });
        getUsers();
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar el usuario:", error);
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
  //fin funcion delete

  // UseEffect to get users
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container-fluid">
      {/* Tabla para mostrar los usuarios */}
      <div id="tabladatos" className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 id="titablausers" className="m-0 font-weight-bold text-primary">
            Usuarios
          </h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" id="example" width="100%" cellSpacing="0"
            >
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">N° Cédula</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Teléfono</th>
                  <th scope="col">Dirección</th>
                  <th className="opciones" scope="col">
                    Opciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((user) => (
                  <tr key={user.usuarioId}>
                    <td>{user.usuarioId}</td>
                    <td>{user.cedula}</td>
                    <td>{user.nombre}</td>
                    <td>{user.telefono}</td>
                    <td>{user.direccion}</td>
                    <td className="opciones">
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic example"
                      >
                        <button
                          type="button"
                          className="btn btn-info"  data-bs-toggle="modal" data-bs-target="#modaledituser"
                          onClick={() => {
                            setusuarioid(user.usuarioId);
                            setCedula(user.cedula);
                            setNombre(user.nombre);
                            setDireccion(user.direccion);
                            setTelefono(user.telefono);
                            setEditar(true); //banderita
                          }}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger "
                          onClick={() =>
                            deleteUser(user.usuarioId, user.nombre)
                          } // Corrección aquí
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

      {/*MODAL USER*/}
      <div className="container">
        <div class="modal-dialog modal-lg">
          <div class="modal fade" id="modaledituser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Editar Usuario</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

            <form id="reg-pdo">
              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">
                  Id
                </span>
                <input
                  readOnly
                  id="id"
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(event) => setusuarioid(event.target.value)}
                  value={usuarioid}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">
                  Cédula
                </span>
                <input
                  id="cedula"
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(event) => setCedula(event.target.value)}
                  value={cedula}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">
                  Nombre
                </span>
                <input
                  id="nombre"
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(event) => setNombre(event.target.value)}
                  value={nombre}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">
                  Dirección
                </span>
                <input
                  id="direccion"
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(event) => setDireccion(event.target.value)}
                  value={direccion}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">
                  Teléfono
                </span>
                <input
                  id="telefono"
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(event) => setTelefono(event.target.value)}
                  value={telefono}
                />
              </div>
            </form>
  
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-primary" onClick={updateUser}>Guardar Cambios</button>
                  <button type="button" class="btn btn-secondary" id="cerrarmodal" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editar_User;
