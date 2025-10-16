document.addEventListener("DOMContentLoaded", () => {
  const listado = document.getElementById("listadoCompleto");
  const formAgregar = document.getElementById("formAgregarMedico");
  const formEditar = document.getElementById("formEditarMedico");
  const modalEditar = new bootstrap.Modal(document.getElementById("modalEditarMedico"));

  let todosLosMedicos = [];
  let medicoSeleccionado = null;

  // Médicos iniciales
  const medicosIniciales = [
    { nombre:"Dr. Juan Pérez", especialidad:"Cardiología", matricula:"256985", foto:"../fotos/1.jpg" },
    { nombre:"Dr. Manuel Aboy", especialidad:"Traumatología", matricula:"254796", foto:"../fotos/2.jpg" },
    { nombre:"Dr. Osvaldo Rizzo", especialidad:"Clínica Médica", matricula:"482365", foto:"../fotos/3.jpg" }
  ];

  // Cargar médicos desde localStorage o iniciales
  function cargarMedicos() {
    const stored = JSON.parse(localStorage.getItem("medicos"));
    if (!stored) {
      todosLosMedicos = medicosIniciales;
      localStorage.setItem("medicos", JSON.stringify(todosLosMedicos));
    } else {
      todosLosMedicos = stored;
    }
    mostrarMedicos();
  }

  // Mostrar lista
  function mostrarMedicos() {
    listado.innerHTML = "";
    todosLosMedicos.forEach(m => {
      const card = document.createElement("div");
      card.classList.add("card","p-3","mb-3");
      card.innerHTML = `
        <div class="d-flex align-items-center gap-3">
          <img src="${m.foto || '../fotos/default.jpg'}" class="rounded-circle" width="80" height="80">
          <div>
            <h5>${m.nombre}</h5>
            <p>Especialidad: ${m.especialidad}</p>
            <p>Matrícula: ${m.matricula}</p>
          </div>
        </div>
        <div class="mt-2 d-flex gap-2">
          <button class="btn btn-sm btn-warning btn-editar" title="Editar" data-matricula="${m.matricula}">
          <i  class="bi bi-pencil"></i>
         </button>
          <button class="btn btn-danger btn-sm borrar" data-matricula="${m.matricula}">Borrar</button>
        </div>
      `;
      listado.appendChild(card);
    });

    // Delegar botones
    document.querySelectorAll(".btn-editar").forEach(btn => {
    btn.addEventListener("click", () => editarMedico(btn.dataset.matricula));
    });
    document.querySelectorAll(".borrar").forEach(btn => {
      btn.addEventListener("click", () => borrarMedico(btn.dataset.matricula));
    });
  }

  // Agregar médico
  formAgregar.addEventListener("submit", e => {
    e.preventDefault();
    const nuevo = {
      nombre: document.getElementById("nombreYapellido").value.trim(),
      especialidad: document.getElementById("especialidad").value.trim(),
      matricula: document.getElementById("matricula").value.trim(),
      foto: document.getElementById("foto").value.trim()
    };
    todosLosMedicos.push(nuevo);
    localStorage.setItem("medicos", JSON.stringify(todosLosMedicos));
    formAgregar.reset();
    mostrarMedicos();
  });

  // Editar médico
  function editarMedico(matricula) {
    medicoSeleccionado = todosLosMedicos.findIndex(m => m.matricula === matricula);
    if (medicoSeleccionado === -1) return;

    const m = todosLosMedicos[medicoSeleccionado];
    document.getElementById("editarNombre").value = m.nombre;
    document.getElementById("editarEspecialidad").value = m.especialidad;
    document.getElementById("editarMatricula").value = m.matricula;
    document.getElementById("editarFoto").value = m.foto || "";

    modalEditar.show();
  }

  // Guardar cambios
  formEditar.addEventListener("submit", e => {
    e.preventDefault();
    if (medicoSeleccionado === null) return;

    todosLosMedicos[medicoSeleccionado] = {
      nombre: document.getElementById("editarNombre").value.trim(),
      especialidad: document.getElementById("editarEspecialidad").value.trim(),
      matricula: document.getElementById("editarMatricula").value.trim(),
      foto: document.getElementById("editarFoto").value.trim()
    };

    localStorage.setItem("medicos", JSON.stringify(todosLosMedicos));
    modalEditar.hide();
    mostrarMedicos();
  });

  // Borrar médico
  function borrarMedico(matricula) {
    if (!confirm("¿Desea borrar este médico?")) return;
    todosLosMedicos = todosLosMedicos.filter(m => m.matricula !== matricula);
    localStorage.setItem("medicos", JSON.stringify(todosLosMedicos));
    mostrarMedicos();
  }

  // Inicializar
  cargarMedicos();
});