const renderPokemon = async (id) => {
  const mainContent = document.getElementById("main-content");

  const response = await fetch(`/pokemons/${id}`);
  const data = await response.json();

  mainContent.innerHTML = "";

  if (data && !data.error) {
    // Create a wrapper for fatebound info
    const wrapper = document.createElement("div");
    wrapper.classList.add(
      "wrapper",
      "w-[1270px]",
      "m-auto",
      "press-start-2p-regular",
       "text-pop-stroke",
       "h-full",
       "my-10"
    );

    // Title
    const title = document.createElement("h1");
    title.textContent = data.name;
    title.classList.add("text-6xl", "p-8");

    // Image
    const img = document.createElement("img");
    img.src = data.image_url;
    img.alt = `${data.name} image`;
    img.classList.add(
      "img-pixelated",
      "h-auto",
      "w-full",
      "mb-4",
      "scale-110",
      "-mt-30"
    );

    const statsTable = document.createElement("table");
    const headers = ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"];

    const stats = [
      data.hp,
      data.attack,
      data.defense,
      data.sp_atk,
      data.sp_def,
      data.speed,
    ];
    stats.map((stat, index) => {
      const dataRow = document.createElement("tr");
      const tdH = document.createElement("td");
      const tdS = document.createElement("td");
      tdH.textContent = headers[index];
      tdS.textContent = stat;
      dataRow.appendChild(tdH);
      dataRow.appendChild(tdS);
      statsTable.appendChild(dataRow);
    });

    statsTable.classList.add(
        "stat",
       "text-2xl"
    )

    
    const imgPEContainerMain = document.createElement("div");
    imgPEContainerMain.classList.add(
        "flex",
        "my-8",
        "align-center"
    )

    const imgPEContainer = document.createElement("div");
    imgPEContainer.classList.add(
        "overflow-hidden",
        "pixelated-bg",
        "mx-4",
        "pixelBorder",
        "pixelBorder--22",
        "mt-4",
        "mb-8",
        "w-[32rem]",
        "h-[28rem]"
      );
    imgPEContainer.appendChild(img);

    imgPEContainerMain.appendChild(imgPEContainer);
    imgPEContainerMain.appendChild(statsTable);

    // Append all elements to the wrapper
    wrapper.appendChild(title);
    wrapper.appendChild(imgPEContainerMain);

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
