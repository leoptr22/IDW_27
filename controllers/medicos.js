document.addEventListener("DOMContentLoaded", () => {
  const listado = document.getElementById("listadoCompleto");
  const formAgregar = document.getElementById("formAgregarMedico");
  const formEditar = document.getElementById("formEditarMedico");
  const modalEditar = new bootstrap.Modal(document.getElementById("modalEditarMedico"));

  let todosLosMedicos = [];
  let medicoSeleccionado = null;

  // Datos iniciales
  const medicosIniciales = [];

  // Cargar desde localStorage o inicializar
  function cargarMedicos() {
    const stored = JSON.parse(localStorage.getItem("medicos"));
    todosLosMedicos = stored || medicosIniciales;
    localStorage.setItem("medicos", JSON.stringify(todosLosMedicos));
    mostrarMedicos();
  }

  // Mostrar listado
  function mostrarMedicos() {
    listado.innerHTML = "";
    todosLosMedicos.forEach((m, index) => {
      const card = document.createElement("div");
      card.classList.add("card", "p-3", "mb-3");
      card.innerHTML = `
        <td>
        <div class="d-flex align-items-center">
          <img src="${m.foto || '../fotos/default.jpg'}" 
               class="rounded-circle me-3" 
               width="80" height="80">
          <div>
            <h5 class="mb-1">${m.nombre}</h5>
            <p class="mb-1"><strong>Especialidad:</strong> ${m.especialidad}</p>
            <p class="mb-0"><strong>Matrícula:</strong> ${m.matricula}</p>
          </div>
        </div>
      </td>
      <td>
        <div class="d-flex justify-content-end gap-2">
          <button class="btn btn-sm btn-warning btn-editar" title="Editar" data-index="${index}">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-danger borrar" title="Borrar" data-index="${index}">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </td>
      `;
      listado.appendChild(card);
    });

    // Asignar eventos de edición y borrado
    document.querySelectorAll(".btn-editar").forEach(btn => {
      btn.addEventListener("click", () => editarMedico(btn.dataset.index));
    });

    document.querySelectorAll(".borrar").forEach(btn => {
      btn.addEventListener("click", () => borrarMedico(btn.dataset.index));
    });
  }

  // Agregar médico nuevo
 formAgregar.addEventListener("submit", async e => {
  e.preventDefault();

  const file = document.getElementById("fotoFile").files[0]; // file desde escritorio
  const fotoData = await readFileAsDataURL(file); // base64 o null

  const nuevo = {
    nombre: document.getElementById("nombreYapellido").value.trim(),
    especialidad: document.getElementById("especialidad").value.trim(),
    matricula: document.getElementById("matricula").value.trim(),
    // si no subió archivo, podés dejar "", o usar una ruta relativa ya existente
    foto: fotoData || document.getElementById("foto").value.trim() || "" 
  };

  todosLosMedicos.push(nuevo);
  localStorage.setItem("medicos", JSON.stringify(todosLosMedicos));
  formAgregar.reset();
  mostrarMedicos();
});


  // 🟢 Editar médico usando data-index
  function editarMedico(index) {
    medicoSeleccionado = parseInt(index);
    const m = todosLosMedicos[medicoSeleccionado];

    document.getElementById("editarNombre").value = m.nombre;
    document.getElementById("editarEspecialidad").value = m.especialidad;
    document.getElementById("editarMatricula").value = m.matricula;
    document.getElementById("editarFoto").value = m.foto || "";

    modalEditar.show();
  }

  // Guardar edición
 formEditar.addEventListener("submit", async e => {
  e.preventDefault();
  if (medicoSeleccionado === null) return;

  const file = document.getElementById("editarFotoFile").files[0];
  const fotoData = await readFileAsDataURL(file);



  todosLosMedicos[medicoSeleccionado] = {
    nombre: document.getElementById("editarNombre").value.trim(),
    especialidad: document.getElementById("editarEspecialidad").value.trim(),
    matricula: document.getElementById("editarMatricula").value.trim(),
    foto: fotoData || currentFoto || ""
  };

  localStorage.setItem("medicos", JSON.stringify(todosLosMedicos));
  modalEditar.hide();
  mostrarMedicos();
});


  // Borrar médico usando data-index
  function borrarMedico(index) {
    if (!confirm("¿Desea borrar este médico?")) return;
    todosLosMedicos.splice(index, 1);
    localStorage.setItem("medicos", JSON.stringify(todosLosMedicos));
    mostrarMedicos();
  }

  // Inicializar
  cargarMedicos();
});


