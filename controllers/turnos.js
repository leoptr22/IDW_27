document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("turnoForm");
  const selectProfesionales = document.getElementById("profesionales");

  function cargarMedicosSelect() {
    let medicos = JSON.parse(localStorage.getItem("medicos"));
    if (!medicos || medicos.length === 0) {
      medicos = [
        { nombre: "Dr. Juan Pérez", especialidad: "Cardiologia Infantil" },
        { nombre: "Dr. Manuel Aboy", especialidad: "Traumatologia" },
        { nombre: "Dr. Osvaldo Rizzo", especialidad: "Clinica Medica" },
      ];
      localStorage.setItem("medicos", JSON.stringify(medicos));
    }
    selectProfesionales.innerHTML = "";
    medicos.forEach((m) => {
      const option = document.createElement("option");
      option.value = m.nombre;
      option.textContent = `${m.nombre} - ${m.especialidad}`;
      selectProfesionales.appendChild(option);
    });
  }

  cargarMedicosSelect();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const turno = {
      nombre: document.getElementById("nombre").value.trim(),
      email: document.getElementById("email").value.trim().toLowerCase(),
      fecha: document.getElementById("fecha").value,
      hora: document.getElementById("hora").value,
      obraSocial: document.getElementById("obra_social").value,
      profesional: selectProfesionales.value,
    };

    const turnos = JSON.parse(localStorage.getItem("turnos")) || [];

    const yaExiste = turnos.some(
      (t) => t.email === turno.email && t.fecha === turno.fecha && t.hora === turno.hora
    );

    if (yaExiste) {
      alert("Este turno ya fue reservado con ese email en esa fecha y hora.");
      return;
    }

    turnos.push(turno);
    localStorage.setItem("turnos", JSON.stringify(turnos));
    alert("Turno reservado con éxito.");
    form.reset();
  });
});
