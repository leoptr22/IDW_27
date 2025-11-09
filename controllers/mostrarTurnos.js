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
      <strong> Turno a nombre de:  ${turno.nombre}</strong> <br /> | Su E-mail:  ${turno.email} <br />
      | Fecha: ${turno.fecha} Profesional: ${turno.profesional} <br />| Hora: ${turno.hora} <br />Obra Social: ${turno.obraSocial}
    `;
    lista.appendChild(item);
  });

  container.appendChild(lista);
});

