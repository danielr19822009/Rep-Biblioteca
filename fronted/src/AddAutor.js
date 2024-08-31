import React, { useState, useEffect } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
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
        showConfirmButton: true,
      });
    } else {
 // Realiza una solicitud POST para agregar el autor
      Axios.post("http://localhost:3001/add_autores", {
        nombreAutor,
        apellidoAutor,
      })
      Swal.fire({
        title: "Good job!",
        html: `<strong>${nombreAutor + ' '+ apellidoAutor }</strong>,  Registrado`,
        icon: "success"
      })

        .then(() => {
          getAutores() // Actualiza la lista de autores

          limpiarcampos(); 
        })
        .catch((error) => {
          console.error("Hubo un error al registrar:", error);
          Swal.fire({
            title: "Bad job!",
            html: `<strong>${nombreAutor + ' '+ apellidoAutor }</strong>, No fue posible el Registro`,
            icon: "error"
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
    limpiarcampos();
  }, []);


  // Función para limpiar los campos de entrada
  const limpiarcampos = () => {
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


// export function export_addAutor(nombre,apellido) {
//     // Realiza una solicitud POST para agregar el autor
//     Axios.post("http://localhost:3001/add_autores", {
//       nombre,
//       apellido,
//     })
// }

export default Add_Autor;
