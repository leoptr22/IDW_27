import { login } from "../controllers/auth.js";

function mostrarMensaje (texto, tipo = "danger") {
        mensajeDiv.innerHTML = `
  <div class="d-flex justify-content-center "> 
    <div class="alert alert-${tipo}" role="alert">${texto}</div>
  </div>`;
    }


// si no sos admin, no se accede a la lista de usuarioss
window.habilitadoUser = function habilitadoUser(){
   if (sessionStorage.getItem('role_admin') === 'admin') {
    mostrarMensaje('Acceso permitido por ser administrador, redirigiendo', 'success');
    setTimeout(() => {
            window.location.href = 'usuarios.html';
        }, 2000);
} else {
     mostrarMensaje('Acceso denegado a usuarios', 'danger');
}
}


const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const mensajeDiv = document.getElementById('mensaje');








loginForm.addEventListener('submit', async function  (event) {
    event.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
 
    // Credenciales por defecto para pruebas (SuperAdmin)

    if (username==="admin" || password==="1234") {
        mostrarMensaje('Credenciales de administrador por defecto (Super Admin), redirigiendo...', 'success');
        sessionStorage.setItem('nombre_admin', 'admin');
        sessionStorage.setItem('token_admin', 'default_token');
        sessionStorage.setItem('role_admin', 'admin'); // le asigno rol de administrador
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
        return;
    }


    
    const usuarioValido = await login(username, password);

    if (usuarioValido) {
        sessionStorage.setItem('nombre_admin', usuarioValido.username);
        sessionStorage.setItem('token_admin', usuarioValido.accessToken);
        sessionStorage.setItem('role_admin', usuarioValido.role);
      
        mostrarMensaje('Inicio de sesión exitoso. Redirigiendo...', 'success');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    } else {
        mostrarMensaje('Usuario o contraseña incorrectos. Inténtelo de nuevo.', 'danger');  
    }

    } )



