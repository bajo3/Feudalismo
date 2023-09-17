document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const accountMenu = document.getElementById("accountMenu");
  const closeButton = document.getElementById("closeButton");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const championCards = document.getElementById("championCards"); // Contenedor de las tarjetas de campeones
  const loadMoreButton = document.getElementById("loadMoreButton"); // Botón "Cargar más"
  const cardsPerPage = 8; // Número de tarjetas por página
  let currentPage = 0; // Página actual
  let allChampions = [];

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

  // Función para abrir o cerrar el menú de cuenta
  function toggleAccountMenu() {
    if (accountMenu.classList.contains("active")) {
      closeAccountMenu();
    } else {
      openAccountMenu();
    }
  }

  // Agregar evento de clic al botón de cuenta
  const account = document.querySelector(".account");
  account.addEventListener("click", toggleAccountMenu);

  // Agregar evento de clic al botón de cierre del menú de cuenta
  closeButton.addEventListener("click", closeAccountMenu);

  // Obtén una referencia al icono del menú
  const accountIcon = document.querySelector(".account i");

  // Agrega un evento de clic al icono del menú para abrir/cerrar el menú de cuenta
  accountIcon.addEventListener("click", function (event) {
    toggleAccountMenu();
    // Evita que el evento se propague y cierre el menú lateral
    event.stopPropagation();
  });

  // Cerrar el menú de cuenta al hacer clic fuera de él
  document.addEventListener("click", function (event) {
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
  darkModeToggle.addEventListener("click", function () {
    toggleDarkMode();
  });

  // Agregar evento de clic al botón de búsqueda
  searchButton.addEventListener("click", function () {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm.length === 0) {
      // Si el campo de búsqueda está vacío, muestra todos los campeones nuevamente
      showAllChampions();
    } else {
      // Filtra los campeones por nombre y muestra los coincidentes
      filterChampionsByName(searchTerm);
    }
  });

  // Función para mostrar todos los campeones
  function showAllChampions() {
    const championCards = document.querySelectorAll(".champion-card");
    championCards.forEach((card) => {
      card.style.display = "block";
    });
  }

  // Función para filtrar los campeones por nombre
  function filterChampionsByName(name) {
    const championCards = document.querySelectorAll(".champion-card");
    let foundChampions = 0; // Variable para rastrear si se encontró al menos un campeón
    championCards.forEach((card) => {
      const championName = card.querySelector("h2").textContent.toLowerCase();
      if (championName.includes(name)) {
        card.style.display = "block";
        foundChampions++;
      } else {
        card.style.display = "none";
      }
    });

    // Si no se encontraron campeones, puedes cargarlos desde el archivo JSON
    if (foundChampions === 0) {
      cargarJSON(url, (campeones) => {
        campeones.forEach((campeon) => {
          const championName = campeon.name.toLowerCase();
          if (championName.includes(name)) {
            const card = crearTarjeta(campeon);
            card.style.display = "block";
            championCards.appendChild(card);
            // Agrega la clase "show" después de agregar la tarjeta al contenedor
            setTimeout(() => {
              card.classList.add("show");
            }, 100); // Un pequeño retraso para que las tarjetas aparezcan secuencialmente
          }
        });
      });
    }
  }

  // Suponiendo que tienes un archivo JSON llamado campeones.json con datos de campeones
  const url = "js/campeones.json";

  // Función para cargar el archivo JSON
  function cargarJSON(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(JSON.parse(xhr.responseText));
      }
    };
    xhr.send(null);
  }

  // Función para crear una tarjeta de campeón
  function crearTarjeta(campeon) {
    const card = document.createElement("div");
    card.className = "champion-card"; // Estiliza tus tarjetas según tus preferencias

    const img = document.createElement("img");
    img.src = campeon.icon; // Supongo que "icon" es la propiedad del JSON que contiene la URL de la imagen

    const name = document.createElement("h2");
    name.textContent = campeon.name; // Supongo que "name" es la propiedad del JSON que contiene los nombres

    const title = document.createElement("p");
    title.textContent = campeon.title; // Supongo que "title" es la propiedad del JSON que contiene los títulos

    // Agregar más detalles según tus necesidades
    const tags = document.createElement("p");
    tags.textContent = "Tags: " + campeon.tags.join(", "); // Unir los elementos del array 'tags' con comas

    const stats = document.createElement("ul");
    stats.innerHTML = `
      <li>HP: ${campeon.stats.hp}</li>
      <li>MP: ${campeon.stats.mp}</li>
      <li>Movimiento: ${campeon.stats.movespeed}</li>
      <li>Armadura: ${campeon.stats.armor}</li>
      <li>Resistencia mágica: ${campeon.stats.spellblock}</li>
      <li>Rango de ataque: ${campeon.stats.attackrange}</li>
      <li>Regeneración de HP: ${campeon.stats.hpregen}</li>
      <li>Regeneración de MP: ${campeon.stats.mpregen}</li>
      <li>Crítico: ${campeon.stats.crit}</li>
      <li>Daño de ataque: ${campeon.stats.attackdamage}</li>
      <li>Velocidad de ataque: ${campeon.stats.attackspeed}</li>
    `;

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(title);
    card.appendChild(tags);
    card.appendChild(stats);

    return card;
  }

  // Función para cargar y mostrar una página de tarjetas de campeones
  function cargarYMostrarTarjetas(campeones, startIndex, endIndex) {
    for (let i = startIndex; i < endIndex; i++) {
      if (i >= campeones.length) {
        // Se han cargado todas las tarjetas, oculta el botón "Cargar más"
        loadMoreButton.style.display = "none";
        break;
      }

      const campeon = campeones[i];
      const card = crearTarjeta(campeon);
      championCards.appendChild(card);

      // Agrega la clase "show" después de agregar la tarjeta al contenedor
      setTimeout(() => {
        card.classList.add("show");
      }, 100 * i); // Un pequeño retraso para que las tarjetas aparezcan secuencialmente
    }
  }

  // Cargar la primera página de tarjetas cuando se carga la página
  cargarJSON(url, (campeones) => {
    cargarYMostrarTarjetas(campeones, 0, cardsPerPage);
    currentPage++;
    allChampions = campeones; // Almacena todos los campeones cargados inicialmente
  });

  // Agregar evento de clic al botón "Cargar más" para cargar la siguiente página
  loadMoreButton.addEventListener("click", () => {
    cargarJSON(url, (campeones) => {
      cargarYMostrarTarjetas(campeones, currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage);
      currentPage++;

      // Agrega los campeones recién cargados a la lista de todos los campeones
      allChampions = allChampions.concat(campeones);
    });
  });

  // ...

  // Función para filtrar los campeones por nombre
  function filterChampionsByName(name) {
    const filteredChampions = allChampions.filter((campeon) => {
      const championName = campeon.name.toLowerCase();
      return championName.includes(name);
    });

    // Limpia el contenedor de tarjetas antes de mostrar los resultados filtrados
    championCards.innerHTML = "";

    // Muestra los campeones filtrados
    if (filteredChampions.length > 0) {
      cargarYMostrarTarjetas(filteredChampions, 0, Math.min(filteredChampions.length, cardsPerPage));
    } else {
      // Si no se encontraron coincidencias, muestra un mensaje de "No se encontraron resultados".
      championCards.innerHTML = '<p>No se encontraron resultados.</p>';
    }
  }

  // ...
});
