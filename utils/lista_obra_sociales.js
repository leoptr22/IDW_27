fetch ("data/medicos.json") 
    .then (response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Error respesta especialidades");
  }})

    .then(data => {
        const medicos = data.medicos;
        const select = document.getElementById("obraSocialSelect");
            const option = document.createElement("option");
            option.value = " ";
            option.innerHTML = "Seleccione una Obra Social";
            select.appendChild(option);

            const obra_social = new Set(medicos.map(medico => medico.obras_sociales));
            obra_social.forEach(obraSocial => {
                const option = document.createElement("option");
                option.value = obraSocial;
                option.innerHTML = obraSocial;
                select.appendChild(option);
            });

            
        })
    

   .catch(error => {
    console.error("Hubo un problema al cargar los datos:", error);
    alert("No se pudieron cargar las especialidades. Por favor, inténtelo más tarde.");
});