document.addEventListener("DOMContentLoaded", function () {
  const listaMedicos = document.getElementById("listaMedicos");
  
   const medicosIniciales = [
    { nombre: "Dr. Juan Pérez", especialidad: "Cardiología Infantil",consulta:"$ 40000", obraSocial: "osde", matricula: "256985", foto: "./fotos/1.jpg" },
    { nombre: "Dr. Manuel Aboy", especialidad: "Traumatología", consulta:"$ 40000", obraSocial: "Pami", matricula: "254796", foto: "./fotos/2.jpg" },
    { nombre: "Dr. Osvaldo Rizzo", especialidad: "Clínica Médica", consulta:"$ 40000", obraSocial:"Oser", matricula: "482365", foto: "./fotos/3.jpg" }
  ];

  let medicos = JSON.parse(localStorage.getItem("medicos"));
  
  // aca si no hay médicos en localStorage va usar los iniciales
  if (!medicos || medicos.length === 0) {
    medicos = medicosIniciales;
    localStorage.setItem("medicos", JSON.stringify(medicos));
  }
  

  medicos.forEach(medico => {
    const card = document.createElement("div");
    card.classList.add("col");

    card.innerHTML = `
      <div class="card h-100 shadow-sm border-0">
        <img src="${medico.foto}" class="card-img-top" alt="${medico.nombre}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title fw-bold">${medico.nombre}</h5>
          <p class="card-text text-primary">${medico.especialidad}</p>
          <p class="mt-auto mb-0"><small class="text-muted">Matrícula: ${medico.matricula}</small></p>
          <p class="mb-0"><small class="text-muted">Valor Consulta: ${medico.consulta}</small></p>
          <p class="mb-0"><small class="text-muted">Obras Sociales: ${medico.obraSocial}</small></p>
          
        </div>
      </div>
    `;

    listaMedicos.appendChild(card);
  });
});