import React, { useState, useEffect } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./css/sb-admin-2.css";
import "./css/sb-admin-2.min.css";
import Swal from "sweetalert2";
import Axios from "axios";


// Componente para la gestión de autores
const Add_Autor = () => {
  // Definición de estados para manejar los datos del autor y la lista de autores
  const [autorid, setAutorid] = useState("");
  const [nombreAutor, setNombreAutor] = useState("");
  const [apellidoAutor, setApellidoAutor] = useState("");
  const [autores, setAutores] = useState([]);

  // Función para agregar un nuevo autor
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

      // Realiza una solicitud POST para agregar el autor
      Axios.post("http://localhost:3001/add_autores", {
        nombreAutor,
        apellidoAutor,
      })
        .then(() => {
          getAutores(); // Actualiza la lista de autores
          setNombreAutor(""); // Limpia los campos
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

  // Función para obtener la lista de autores
  const getAutores = () => {
    Axios.get("http://localhost:3001/get_autores")
      .then((response) => {
        setAutores(response.data); // Actualiza el estado con los datos obtenidos
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los autores:", error);
      });
  };

  // Hook para cargar los autores al montar el componente
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
        getAutores(); // Actualiza la lista de autores después de eliminar
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

  // Función para actualizar un autor
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
        getAutores(); // Actualiza la lista de autores después de la actualización
        clear(); // Limpia los campos
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

  // Función para limpiar los campos de entrada
  const clear = () => {
    setNombreAutor("");
    setApellidoAutor("");
    setAutorid(""); // Limpia el ID del autor para la edición
  };

  return (
    <div className="container-fluid">
      <div className="container containerAutor">
        <div className="card text-center">
        <div className="card-header">Registra Nuevo Autor</div>
          <div className="card">
            <div className="card-body">
              <form id="reg-pdo">
                
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

      
    </div>
  );
};


export function export_addAutor(nombre,apellido) {
    // Realiza una solicitud POST para agregar el autor
    Axios.post("http://localhost:3001/add_autores", {
      nombre,
      apellido,
    })
}

export default Add_Autor;
