document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("turno-Form");

  const turnos = JSON.parse(localStorage.getItem("turnos")) || [];

  if (turnos.length === 0) {
    container.innerHTML = "<p>No hay turnos reservados.</p>";
    return;
  }

  const lista = document.createElement("ul");

  turnos.forEach((turno) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <strong>${turno.nombre}</strong> - ${turno.email} <br />
      Fecha: ${turno.fecha} Profesional: ${turno.profesional} | Hora: ${turno.hora}
    `;
    lista.appendChild(item);
  });

  container.appendChild(lista);
});

