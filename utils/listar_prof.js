


fetch ("../data/medicos.json") 
    .then (response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error respesta medicos");
  }})

    .then(data => {
        const medicos = data.medicos;
        const select = document.getElementById("profesionales");
            const option = document.createElement("option");
            option.value = " ";
            option.innerHTML = "Seleccione un profesional";
            select.appendChild(option);

            const medico = new Set(medicos.map(medico => medico.nombre));
            medico.forEach(nombre => {
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