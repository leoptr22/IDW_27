document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("turnoForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const turno = {
      nombre: document.getElementById("nombre").value.trim(),
      email: document.getElementById("email").value.trim().toLowerCase(),
      fecha: document.getElementById("fecha").value,
      hora: document.getElementById("hora").value,
      profesional: document.getElementById("profesionales").value
    };

   
    const turnos = JSON.parse(localStorage.getItem("turnos")) || [];

   
    const yaExiste = turnos.some(t =>
      t.email === turno.email &&
      t.fecha === turno.fecha &&
      t.hora === turno.hora
    );

    if (yaExiste) {
      alert(" Este turno ya fue reservado con ese email en esa fecha y hora.");
      return;
    }

   
    turnos.push(turno);
    localStorage.setItem("turnos", JSON.stringify(turnos));
    alert(" Turno reservado con éxito.");
    form.reset();
  });
});

