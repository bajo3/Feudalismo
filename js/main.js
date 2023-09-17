document.addEventListener("DOMContentLoaded", function () {
  const championCards = document.getElementById("championCards"); // Contenedor de las tarjetas de campeones
  const loadMoreButton = document.getElementById("loadMoreButton"); // Botón "Cargar más"
  const cardsPerPage = 8; // Número de tarjetas por página
  let currentPage = 0; // Página actual

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
        // Se han cargado todas las tarjetas
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
  });

  // Agregar evento de clic al botón "Cargar más" para cargar la siguiente página
  loadMoreButton.addEventListener("click", () => {
    cargarJSON(url, (campeones) => {
      cargarYMostrarTarjetas(campeones, currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage);
      currentPage++;
    });
  });
});
