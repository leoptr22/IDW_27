document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formAgregarMedico");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombreYapellido = document.getElementById("nombreYapellido").value;
    const especialidad = document.getElementById("especialidad").value;
    const matricula = document.getElementById("matricula").value;

    const nuevoMedico = {
      nombre: nombreYapellido,
      especialidad: especialidad,
      matricula: matricula
    };

    let medicos = JSON.parse(localStorage.getItem("medicos")) || [];

    medicos.push(nuevoMedico);

    localStorage.setItem("medicos", JSON.stringify(medicos));

    form.reset();
    alert("Médico agregado correctamente.");
  });
});
