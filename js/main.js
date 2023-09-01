document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const accountMenu = document.getElementById("accountMenu");
    const closeButton = document.getElementById("closeButton");

    menuToggle.addEventListener("click", function() {
        if (sidebar.style.left === "-250px") {
            sidebar.style.left = "0";
        } else {
            sidebar.style.left = "-250px";
        }
    });

    const account = document.querySelector(".account");
    account.addEventListener("click", function() {
        accountMenu.classList.toggle("active");
    });

    // Cerrar el menú al hacer clic en el botón de cierre
    closeButton.addEventListener("click", function() {
        accountMenu.classList.remove("active");
    });

    // Cerrar el menú al hacer clic fuera de él
    document.addEventListener("click", function(event) {
        if (!account.contains(event.target)) {
            accountMenu.classList.remove("active");
        }
    });
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;
    let isDarkMode = false;

    // Función para cambiar el modo y girar el botón
    function toggleDarkMode() {
        isDarkMode = !isDarkMode;
        body.classList.toggle("dark-mode", isDarkMode);
        body.classList.toggle("light-mode", !isDarkMode);
        darkModeToggle.classList.toggle("dark", isDarkMode);
    }

    // Cambia el modo y gira el botón al hacer clic en el botón de Modo Oscuro
    darkModeToggle.addEventListener("click", function() {
        toggleDarkMode();
    });
});
