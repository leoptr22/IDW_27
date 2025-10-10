
 let medicos = [];


fetch ("../data/medicos.json") 
    .then (response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error respesta especialidades");
  }})

    .then(data => {
        const medicos = data.medicos;
        const select = document.getElementById("especialidades");
            const option = document.createElement("option");
            option.value = " ";
            option.innerHTML = "Seleccione una especialidad";
            select.appendChild(option);

            const especialidades = new Set(medicos.map(medico => medico.especialidad));
            especialidades.forEach(especialidad => {
                const option = document.createElement("option");
                option.value = especialidad;
                option.innerHTML = especialidad;
                select.appendChild(option);
            });

            
        })
    

   .catch(error => {
    console.error("Hubo un problema al cargar los datos:", error);
    alert("No se pudieron cargar las especialidades. Por favor, inténtelo más tarde.");
});