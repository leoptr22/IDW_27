document.addEventListener("DOMContentLoaded", () => {
  const listado = document.getElementById("listadoCompleto");
  const formAgregar = document.getElementById("formAgregarMedico");
  const formEditar = document.getElementById("formEditarMedico");
  const modalEditar = new bootstrap.Modal(document.getElementById("modalEditarMedico"));

  const inputFotoAgregar = document.getElementById("agregarFoto");
  const vistaPreviaAgregar = document.getElementById("vistaPreviaAgregar");
  const inputFotoEditar = document.getElementById("editarFoto");
  const vistaPreviaEditar = document.getElementById("vistaPreviaEditar");

  let todosLosMedicos = [];
  let medicoSeleccionado = null;

  
  const medicosIniciales = [
    { nombre: "Dr. Juan Pérez", especialidad: "Cardiología", matricula: "256985", foto: "../fotos/1.jpg" },
    { nombre: "Dr. Manuel Aboy", especialidad: "Traumatología", matricula: "254796", foto: "../fotos/2.jpg" },
    { nombre: "Dr. Osvaldo Rizzo", especialidad: "Clínica Médica", matricula: "482365", foto: "../fotos/3.jpg" }
  ];


  function cargarMedicos() {
    const stored = JSON.parse(localStorage.getItem("medicos"));
    todosLosMedicos = stored || medicosIniciales;
    if (!stored) localStorage.setItem("medicos", JSON.stringify(todosLosMedicos));
    mostrarMedicos();
  }

  function mostrarMedicos() {
    listado.innerHTML = "";
    todosLosMedicos.forEach((m, index) => {
      const card = document.createElement("div");
      card.classList.add("card", "p-3", "mb-3", "shadow-sm");
      card.innerHTML = `
        <div class="d-flex align-items-center gap-3">
          <img src="${m.foto || '../fotos/default.jpg'}" class="rounded-circle border" width="80" height="80" style="object-fit: cover;">
          <div>
            <h5>${m.nombre}</h5>
            <p class="mb-1"><strong>Especialidad:</strong> ${m.especialidad}</p>
            <p class="mb-1"><strong>Matrícula:</strong> ${m.matricula}</p>
          </div>
        </div>
        <div class="mt-3 d-flex gap-2">
          <button class="btn btn-sm btn-warning btn-editar" data-index="${index}"><i class="bi bi-pencil"></i></button>
          <button class="btn btn-sm btn-danger btn-borrar" data-index="${index}">Borrar</button>
        </div>
      `;
      listado.appendChild(card);
    });

    document.querySelectorAll(".btn-editar").forEach(btn => {
      btn.addEventListener("click", () => editarMedico(parseInt(btn.dataset.index)));
    });
    document.querySelectorAll(".btn-borrar").forEach(btn => {
      btn.addEventListener("click", () => borrarMedico(parseInt(btn.dataset.index)));
    });
  }

  function leerImagen(input, callback) {
    const archivo = input.files[0];
    if (!archivo) {
      callback("");
      return;
    }
    const reader = new FileReader();
    reader.onload = e => callback(e.target.result);
    reader.readAsDataURL(archivo);
  }

  
  inputFotoAgregar.addEventListener("change", () => {
    leerImagen(inputFotoAgregar, base64 => {
      vistaPreviaAgregar.src = base64 || "../fotos/default.jpg";
    });
  });

  inputFotoEditar.addEventListener("change", () => {
    leerImagen(inputFotoEditar, base64 => {
      vistaPreviaEditar.src = base64 || "../fotos/default.jpg";
    });
  });

  formAgregar.addEventListener("submit", e => {
    e.preventDefault();
    const nombre = document.getElementById("nombreYapellido").value.trim();
    const especialidad = document.getElementById("especialidad").value.trim();
    const matricula = document.getElementById("matricula").value.trim();

    if (!nombre || !especialidad || !matricula) {
      alert("Por favor complete todos los campos.");
      return;
    }

    leerImagen(inputFotoAgregar, base64 => {
      const nuevo = {
        nombre,
        especialidad,
        matricula,
        foto: base64 || "../fotos/default.jpg"
      };

      todosLosMedicos.push(nuevo);
      localStorage.setItem("medicos", JSON.stringify(todosLosMedicos));

      formAgregar.reset();
      vistaPreviaAgregar.src = "../fotos/default.jpg";

      mostrarMedicos();
    });
  });

  function editarMedico(index) {
    medicoSeleccionado = index;
    const m = todosLosMedicos[index];
    document.getElementById("editarNombre").value = m.nombre;
    document.getElementById("editarEspecialidad").value = m.especialidad;
    document.getElementById("editarMatricula").value = m.matricula;
    vistaPreviaEditar.src = m.foto || "../fotos/default.jpg";
    modalEditar.show();
  }

  formEditar.addEventListener("submit", e => {
    e.preventDefault();
    if (medicoSeleccionado === null) return;

    leerImagen(inputFotoEditar, base64 => {
      const m = todosLosMedicos[medicoSeleccionado];
      todosLosMedicos[medicoSeleccionado] = {
        nombre: document.getElementById("editarNombre").value.trim(),
        especialidad: document.getElementById("editarEspecialidad").value.trim(),
        matricula: document.getElementById("editarMatricula").value.trim(),
        foto: base64 || m.foto
      };

      localStorage.setItem("medicos", JSON.stringify(todosLosMedicos));
      modalEditar.hide();
      mostrarMedicos();
    });
  });

  function borrarMedico(index) {
    if (!confirm("¿Desea borrar este médico?")) return;
    todosLosMedicos.splice(index, 1);
    localStorage.setItem("medicos", JSON.stringify(todosLosMedicos));
    mostrarMedicos();
  }

  cargarMedicos();
});