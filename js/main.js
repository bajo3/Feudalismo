document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.getElementById("sidebar");
    const accountMenu = document.getElementById("accountMenu");
    const closeButton = document.getElementById("closeButton");

    // Función para abrir el menú de cuenta y cerrar el menú lateral
    function openAccountMenu() {
        accountMenu.classList.add("active");
        sidebar.style.left = "-250px"; // Cierra el menú lateral
    }

    // Función para cerrar el menú de cuenta
    function closeAccountMenu() {
        accountMenu.classList.remove("active");
    }

    // Función para abrir o cerrar el menú lateral según su estado actual
    function toggleSidebar() {
        if (sidebar.style.left === "-250px") {
            sidebar.style.left = "0";
        } else {
            sidebar.style.left = "-250px";
        }
        closeAccountMenu(); // Cierra el menú de cuenta al abrir el menú lateral
    }

    // Agregar evento de clic al botón del menú lateral
    const menuToggle = document.getElementById("menuToggle");
    menuToggle.addEventListener("click", toggleSidebar);

    // Agregar evento de clic al botón de cuenta
    const account = document.querySelector(".account");
    account.addEventListener("click", openAccountMenu);

    // Agregar evento de clic al botón de cierre del menú de cuenta
    closeButton.addEventListener("click", closeAccountMenu);

    // Cerrar el menú de cuenta al hacer clic fuera de él
    document.addEventListener("click", function(event) {
        if (!account.contains(event.target)) {
            closeAccountMenu();
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

    // Cambia el modo y gira el botón al hacer clic en el botón de Modo Osc uro
    darkModeToggle.addEventListener("click", function() {
        toggleDarkMode();
    });
});
