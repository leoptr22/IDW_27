import { login } from "../controllers/auth.js";

//   si no sos admin, no entrAs al dashboard
if (window.location.pathname.includes("dashboard.html")) {
  if (sessionStorage.getItem("role_admin") !== "admin") {
    mostrarMensaje('Acceso no autorizado. Redirigiendo al inicio.', 'warning');
    sessionStorage.clear();
    window.location.href = "index.html"; 
  }
}

const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const mensajeDiv = document.getElementById('mensaje');

function mostrarMensaje(texto, tipo = "danger") {
  mensajeDiv.innerHTML = `
    <div class="d-flex justify-content-center">
      <div class="alert alert-${tipo}" role="alert">${texto}</div>
    </div>`;
}

window.habilitadoUser = function habilitadoUser() {
  if (sessionStorage.getItem('role_admin') === 'admin') {
    mostrarMensaje('Acceso permitido por ser administrador, redirigiendo', 'success');
    setTimeout(() => window.location.href = 'usuarios.html', 800);
  } else {
    mostrarMensaje('Acceso denegado a usuarios', 'danger');
  }
};

loginForm?.addEventListener('submit', async function (event) {
  event.preventDefault();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username === "admin" && password === "1234") {
    mostrarMensaje('Credenciales de administrador por defecto (Super Admin), redirigiendo...', 'success');
    sessionStorage.setItem('nombre_admin', 'admin');
    sessionStorage.setItem('token_admin', 'default_token');
    sessionStorage.setItem('role_admin', 'admin');
    setTimeout(() => window.location.href = 'dashboard.html', 800);
    return;
  }

  const usuarioValido = await login(username, password);

  if (usuarioValido) {
    if (usuarioValido.role === 'admin') {
      sessionStorage.setItem('nombre_admin', usuarioValido.username);
      sessionStorage.setItem('token_admin', usuarioValido.accessToken);
      sessionStorage.setItem('role_admin', usuarioValido.role);
      mostrarMensaje('Inicio de sesión exitoso. Redirigiendo...', 'success');
      setTimeout(() => window.location.href = 'dashboard.html', 800);
    } else {
      mostrarMensaje('Inicio de sesión OK pero no tiene permisos de administrador.', 'warning');
    }
  } else {
    mostrarMensaje('Usuario o contraseña incorrectos. Inténtelo de nuevo.', 'danger');
  }
});
