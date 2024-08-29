import React, { useState, useEffect } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./css/sb-admin-2.css";
import "./css/sb-admin-2.min.css";


import Swal from "sweetalert2";
import Axios from "axios";



const Add_User = () => {
  const [id, setId] = useState("");
  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");

  const [usersList, setUsersList] = useState([]);
  const [editar, setEditar] = useState(false);  ///banderita

  

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
    setId("");
    setCedula("");
    setNombre("");
    setDireccion("");
    setTelefono("");
    setEditar(false); //banderita
  };

  // Function to add user
  const addUser = () => {
    if (cedula === "" || nombre === "" || direccion === "" || telefono === "") {
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
        html: `<strong>${nombre}</strong>, Registrado`,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      Axios.post("http://localhost:3001/add_users", {
        cedula,
        nombre,
        direccion,
        telefono,
      })
        .then(() => {
          getUsers();
          clear();
        })
        .catch((error) => {
          console.error("Hubo un error al registrar:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error al registrar la persona.",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
          });
        });
    }
  };

  // Function to update user
  const updateUser = () => {
    if (id) {
      Axios.put("http://localhost:3001/update_users", {
        id,
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
  const deleteUser = (id, nombre) => {  // Añade nombre como argumento
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
      <div className="container">
        <div className="card text-center">
          <div className="card-header">Registra Nuevo Usuario</div>
          <div className="card-body">
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
                  onChange={(event) => setId(event.target.value)}
                  value={id}
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
          <div className="card-footer">
            {editar ? (  // si banderita es true activa boton actualizar
              <div>
                <button type="button" className="btn btn-info btn-block" onClick={updateUser}>Actualizar persona</button>
                <button type="button" className="btn btn-warning btn-block" onClick={clear}>Cancelar</button>
              </div>
            ) : (  // si banderita es false activa boton registrar
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={addUser}
              >
                Registrar persona
              </button>
            )}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Add_User;