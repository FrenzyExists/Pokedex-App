const renderPokemon = async (id) => {
  const mainContent = document.getElementById("main-content");

  const response = await fetch(`/pokemons/${id}`);
  const data = await response.json();

  mainContent.innerHTML = "";

  if (data && !data.error) {
    // Create a wrapper for fatebound info
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");

    // Title
    const title = document.createElement("h1");
    title.textContent = data.name;
    title.classList.add("title");

    // Image
    const img = document.createElement("img");
    img.src = data.image_url;
    img.alt = `${data.name} image`;

    const statsTable = document.createElement("table");

    const headerRow = document.createElement("tr");
    const headers = [
      "HP",
      "Attack",
      "Defense",
      "Sp. Atk",
      "Sp. Def",
      "Speed",
    ];
    headers.forEach((header) => {
      const th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    });
    statsTable.appendChild(headerRow);

    // Table Data Row
    const dataRow = document.createElement("tr");
    const stats = [
      data.hp,
      data.attack,
      data.defense,
      data.sp_atk,
      data.sp_def,
      data.speed,
    ];
    stats.forEach((stat) => {
      const td = document.createElement("td");
      td.textContent = stat;
      dataRow.appendChild(td);
    });
    statsTable.appendChild(dataRow);

    const imgPEContainer = document.createElement("div");
    imgPEContainer.appendChild(img);
      imgPEContainer.appendChild(statsTable); 

    // Append all elements to the wrapper
    wrapper.appendChild(title);
    wrapper.appendChild(imgPEContainer);

    // Append the wrapper to mainContent
    mainContent.appendChild(wrapper);
  } else {
    const notFound = document.createElement("h2");
    notFound.textContent = "Pokemon not found 😔";
    notFound.classList.add("not-found");
    mainContent.appendChild(notFound);
  }
};

export default renderPokemon;
