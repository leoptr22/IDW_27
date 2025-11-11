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
    item.innerHTML = 
                `
          Turno a nombre de: <strong>${turno.nombre}</strong><br>
          E-mail: <strong>${turno.email}</strong><br>
          Fecha: <strong>${turno.fecha}</strong> | Profesional: <strong>${turno.profesional}</strong><br>
          Hora: <strong>${turno.hora}</strong><br>
          Obra Social: <strong>${turno.obraSocial}</strong>
`
;
    lista.appendChild(item);
  });

  container.appendChild(lista);
});

