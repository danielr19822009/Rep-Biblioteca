import React, { useState, useEffect } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./css/sb-admin-2.css";
import "./css/sb-admin-2.min.css";
import Swal from "sweetalert2";
import Axios from "axios";

// Componente para la gestión de autores
const Autor = () => {
  const [autorid, setAutorid] = useState("");
  const [nombreAutor, setNombreAutor] = useState("");
  const [apellidoAutor, setApellidoAutor] = useState("");
  const [autores, setAutores] = useState([]);

  // Function to add user
  const addAutor = () => {
    if (nombreAutor === "" || apellidoAutor === "") {
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
        html: `<strong>${nombreAutor}</strong>, Registrado`,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      Axios.post("http://localhost:3001/add_autores", {
        nombreAutor,
        apellidoAutor,
      })
        .then(() => {
          getAutores();
          setNombreAutor("");
          setApellidoAutor("");
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
//funcion obtener o get
  const getAutores = () => {
    Axios.get("http://localhost:3001/get_autores")
      .then((response) => {
        setAutores(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los autores:", error);
      });
  };

  useEffect(() => {
    getAutores();
  }, []);

  // Función para eliminar un autor
  const deleteAutor = (autorId) => {
    Axios.delete(`http://localhost:3001/delete_autor/${autorId}`)
      .then((response) => {
        Swal.fire({
          title: "Eliminado!",
          text: response.data,
          icon: "success",
          timer: 4000,
        });
        getAutores(); // Llama a la función para actualizar la lista de autores después de eliminar
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar el autor:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al eliminar el autor.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
        });
      });
  };
///fncion update autor
  const updateAutores = () => {
    if (!nombreAutor || !apellidoAutor || !autorid) {
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

    Axios.put("http://localhost:3001/update_autor", {
      autorId: autorid,
      nombreAutor,
      apellidoAutor
    })
      .then(() => {
        Swal.fire({
          title: "Actualizado!",
          html: `<strong>${nombreAutor}</strong> Se ha actualizado`,
          icon: "success",
          timer: 4000,
        });
        getAutores();
        clear();
    

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

  //funcion clear limpiar campos
  const clear = () => {
    setNombreAutor("");
    setApellidoAutor("");
    setAutorid(""); // Si necesitas resetear el ID del autor para la edición
  };

  return (
    <div className="container-fluid">
      <div className="container containerAutor">
        <div className="card text-center">
          <div className="card">
            <div className="card-body">
              <form id="reg-pdo">
                <div className="form-group">
                  <h2>AUTOR</h2>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Nombre</span>
                  <input
                    id="nombre"
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(event) => setNombreAutor(event.target.value)}
                    value={nombreAutor}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Apellido</span>
                  <input
                    id="apellido"
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(event) => setApellidoAutor(event.target.value)}
                    value={apellidoAutor}
                  />
                </div>
              </form>
              <button type="button" className="btn btn-block btn-primary" onClick={addAutor}>
                Registrar
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div id="tablausers" className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 id='titablausers' className="m-0 font-weight-bold text-primary">Autores</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Opciones</th>
                </tr>
              </thead>
              <tbody>
                {autores.map((autor) => (
                  <tr key={autor.autorId}>
                    <td>{autor.nombreAutor}</td>
                    <td>{autor.apellidoAutor}</td>
                    <td className="opciones">
                      <div className="btn-group" role="group">
                        <button
                          type="button"
                          className="btn btn-info"
                          onClick={() => {
                            setNombreAutor(autor.nombreAutor);
                            setApellidoAutor(autor.apellidoAutor);
                            setAutorid(autor.autorId); // Establece el ID del autor para editar
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => deleteAutor(autor.autorId)}
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
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editAutorModalLabel">EDITAR AUTOR</h5>
            </div>
            <div className="modal-body">
              <form onSubmit={(event) => { event.preventDefault(); updateAutores(); }}>
                <div className="input-group mb-3">
                  <span className="input-group-text">Nombre</span>
                  <input
                    id="nombreeditar"
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(event) => setNombreAutor(event.target.value)}
                    value={nombreAutor}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Apellido</span>
                  <input
                    id="apellidoeditar"
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(event) => setApellidoAutor(event.target.value)}
                    value={apellidoAutor}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">Actualizar</button>
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

export default Autor;
