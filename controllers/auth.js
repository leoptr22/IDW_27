export async function login(userParam, passParam) {

    try {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: userParam,
                password: passParam,
                expiresInMins: 2, // esto es para que el token expire en 2 minutos segun la documentacion
            }),
        });
        if (!response.ok) {
            alert('Error en la autenticación:', response.statusText);}

        const data = await response.json();
        return data;
    } catch (error) {
        alert('Error en la solicitud de login:', error);
        return false; 
        
    }

}