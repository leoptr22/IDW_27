document.addEventListener("DOMContentLoaded", function () {
  const listaMedicos = document.getElementById("listaMedicos");
  
  

  const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
   console.log("Médicos encontrados:", medicos);


  medicos.forEach(medico => {
    const card = document.createElement("div");
    card.classList.add("col");

    card.innerHTML = `
      
        <div class="card h-100 shadow-sm border-0">
          <img src="${medico.foto}" class="card-img-top" alt="Dr. Pérez">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-bold">${medico.nombre}</h5>
            <p class="card-text text-primary">${medico.especialidad}</p>
            <p class="mt-auto mb-0"><small class="text-muted">Matrícula: ${medico.matricula}</small></p>
          </div>
        </div>
     
    `;

    listaMedicos.appendChild(card);
  });
});


