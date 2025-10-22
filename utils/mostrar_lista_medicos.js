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
        <div>
          <h5 class="mb-1 fw-bold text-primary">${medico.nombre}</h5>
          <p class="mb-1">${medico.especialidad}</p>
        </div>
        <div class="d-flex align-items-center gap-2">
          <span class="badge bg-secondary rounded-pill me-3">Matrícula: ${medico.matricula}</span>
          <button class="btn btn-sm btn-warning btn-editar" title="Editar"><i class="bi bi-pencil"></i></button>
          <button class="btn btn-sm btn-danger btn-borrar" data-index="${index}" title="Borrar"><i class="bi bi-trash"></i></button>
        </div>
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

  // Inicia
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
