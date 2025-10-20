document.addEventListener("DOMContentLoaded", function () {
  const contenedorLista = document.getElementById("listadoCompleto");

  function renderMedicos() {
    contenedorLista.innerHTML = '';

    const medicos = JSON.parse(localStorage.getItem("medicos")) || [];

    if (medicos.length === 0) {
      contenedorLista.innerHTML = '<p class="text-center text-muted fs-5">No hay médicos cargados para mostrar en la lista.</p>';
      return;
    }

    const ul = document.createElement("ul");
    ul.classList.add("list-group", "shadow-sm");

    medicos.forEach((medico, index) => {
      const li = document.createElement("li");
      li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

      li.innerHTML = `
        <tr>
  <td class="fw-bold text-primary">${medico.nombre}</td>
  <td>${medico.especialidad}</td>
  <td>${medico.matricula}</td>
  <td class="text-end">
    <div class="d-flex justify-content-end gap-2">
      <button class="btn btn-sm btn-warning btn-editar" title="Editar">
        <i class="bi bi-pencil"></i>
      </button>
      <button class="btn btn-sm btn-danger btn-borrar" data-index="${index}" title="Borrar">
        <i class="bi bi-trash"></i>
      </button>
    </div>
  </td>
</tr>


      `;

      ul.appendChild(li);
    });

    contenedorLista.appendChild(ul);
  }

  // Función que elimina el médico por índice con el data-index
  function borrarMedicoPorIndice(index) {
    const medicos = JSON.parse(localStorage.getItem("medicos")) || [];

    if (index >= 0 && index < medicos.length) {
      medicos.splice(index, 1); // 
      localStorage.setItem("medicos", JSON.stringify(medicos));
      renderMedicos(); 
    }
  }

  // Inicializa
  renderMedicos();

  //  para manejar el boton "borrar"
  contenedorLista.addEventListener("click", function (event) {
    const btnBorrar = event.target.closest(".btn-borrar");
    if (btnBorrar) {
      const index = parseInt(btnBorrar.getAttribute("data-index"));
      borrarMedicoPorIndice(index);
    }
  });
});
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