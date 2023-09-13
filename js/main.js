document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.getElementById("sidebar");
    const accountMenu = document.getElementById("accountMenu");
    const closeButton = document.getElementById("closeButton");
    const championCards = document.getElementById("championCards"); // Agregamos un elemento div para las tarjetas de campeones
  
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
  
    // Cambia el modo y gira el botón al hacer clic en el botón de Modo Oscuro
    darkModeToggle.addEventListener("click", function() {
      toggleDarkMode();
    });
  
    // Suponiendo que tienes un archivo JSON llamado campeones.json con datos de campeones
    const url = 'js/campeones.json';
  
    // Función para cargar el archivo JSON
    function cargarJSON(url, callback) {
      const xhr = new XMLHttpRequest();
      xhr.overrideMimeType("application/json");
      xhr.open('GET', url, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          callback(JSON.parse(xhr.responseText));
        }
      };
      xhr.send(null);
    }
  
    // Función para crear las tarjetas de campeones
    function crearTarjetas(campeones) {
      campeones.forEach(campeon => {
        const card = document.createElement('div');
        card.className = 'champion-card'; // Estiliza tus tarjetas según tus preferencias
  
        const img = document.createElement('img');
        img.src = campeon.icon; // Supongo que "icon" es la propiedad del JSON que contiene la URL de la imagen
  
        const name = document.createElement('h2');
        name.textContent = campeon.name; // Supongo que "name" es la propiedad del JSON que contiene los nombres
  
        const title = document.createElement('p');
        title.textContent = campeon.title; // Supongo que "title" es la propiedad del JSON que contiene los títulos
  
        // Agrega más detalles según tus necesidades
  
        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(title);
  
        championCards.appendChild(card);
      });
    }
  
    // Cargar el JSON y crear las tarjetas cuando la página se cargue
    cargarJSON(url, campeones => {
      crearTarjetas(campeones);
    });
  });
  