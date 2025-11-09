export async function login(userParam, passParam) {

    try {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: userParam,
                password: passParam,
                
                
            }),
        });

       
            if (!response.ok) {
                alert('Error en la autenticación:', response.statusText);}

                const data = await response.json();

        const respuesta = await fetch ('https://dummyjson.com/users');
            if (respuesta.ok){
                const usersData = await respuesta.json();
            console.log("Usuarios obtenidos:", usersData);

            // Encuentra el usuario que  inicio sesión 
            const user = usersData.users.find(user => user.username === userParam);
            
            if (user) {
                
                data.role = user.role;  // Ahora el objeto data incluye role, osea user es admin o user y se lo asigna a data.role
            } else {
                alert('No se encontró el usuario en la lista de usuarios');
                return false;
            }
        } else {
            alert('Error al obtener los usuarios:', respuesta.statusText);
            return false;
        }

        return data;

    } catch (error) {
        alert('Error en la solicitud de login:', error);
        return false; 
        
    }

    

}