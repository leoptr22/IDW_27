const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const mensajeDiv = document.getElementById('mensaje');


function mostrarMensaje (texto, tipo = "danger") {
        mensajeDiv.innerHTML = `
  <div class="d-flex justify-content-center "> 
    <div class="alert alert-${tipo}" role="alert">${texto}</div>
  </div>`;
    }


loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    const usuarioValido = usuarios.find(usuarios => usuarios.username === username && usuarios.password === password);
    

    if (usuarioValido) {
        sessionStorage.setItem('nombre_admin', username);
        mostrarMensaje('Inicio de sesión exitoso. Redirigiendo...', 'success');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    } else {
        mostrarMensaje('Usuario o contraseña incorrectos. Inténtelo de nuevo.', 'danger');  
    }

    } )



