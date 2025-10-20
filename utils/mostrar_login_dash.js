
document.addEventListener("DOMContentLoaded", function() {
    const nombreGuardado = sessionStorage.getItem("nombre_admin");
    
    const elementoSaludo = document.getElementById("saludo-dashboard"); 

    if (nombreGuardado && elementoSaludo) {
        elementoSaludo.textContent = `Bienvenido, ${nombreGuardado}!`;
        
        

}});

