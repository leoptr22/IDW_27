document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        if (email === "admin@idw.com" && password === "1234") {
            
            window.location.href = "dashboard.html";
        } else {
            alert("Credenciales incorrectas");
        }
    });
});
