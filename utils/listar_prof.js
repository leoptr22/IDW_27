
 let nombre_medico = [];


fetch ("../data/medicos.json") 
    .then (response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error respesta especialidades");
  }})

    .then(data => {
        const nombre_medico = data.medicos;
        const select = document.getElementById("profesionales");
            const option = document.createElement("option");
            option.value = " ";
            option.innerHTML = "Seleccione un Profesional";
            select.appendChild(option);

            const nombreProfesional = new Set(nombre_medico.map(nombre_medico =>nombre_medico.nombre));
            nombreProfesional.forEach(nombre => {
                const option = document.createElement("option");
                option.value = nombre;
                option.innerHTML = nombre;
                select.appendChild(option);
            });

            
        })
    

   .catch(error => {
    console.error("Hubo un problema al cargar los datos:", error);
    alert("No se pudieron cargar los profesionales. Por favor, inténtelo más tarde.");
});