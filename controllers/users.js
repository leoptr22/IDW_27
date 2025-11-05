document.addEventListener('DOMContentLoaded', async () =>  {

    const tablaUsuariosBody = document.querySelector('#tabla-usuarios') 

    try {
        const response = await fetch('https://dummyjson.com/users');
        if (response.ok) { 
            const data = await response.json();
            const usuarios = data.users;

            usuarios.forEach(usuario => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                <td> ${usuario.firstName}</td>
                <td>  ${usuario.username}</td>
                <td>  ${usuario.password}</td>
                <td>  ${usuario.role}</td>


                <td>${usuario.email}</td>
                <td>${usuario.phone}</td>

        `
                tablaUsuariosBody.appendChild(fila);
        
        
            })}
             else {
            console.error('Error al obtener los usuarios:', response.statusText);
        }
    } catch (error) {
        alert('Error en la solicitud fetch:', error);
    }});

  
