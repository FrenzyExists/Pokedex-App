let pageSize = 10;
let totalPages = 1;
let currentPage = 1;

const renderPokemons = async (page = 1, limit = 10) => {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";


  const offset = (page - 1) * pageSize;

  const response = await fetch(`/pokemons?limit=${limit}&page=${page}`);
  const data = await response.json();

  const countResponse = await fetch("/pokemons/count");
  const count = await countResponse.json();

  if (data && !data.error) {
    totalPages = Math.ceil(parseInt(count.count) / limit); // Calculate total pages

    const cardContainer = document.createElement("section");

    cardContainer.classList.add(
      "grid",
      "grid-cols-[repeat(auto-fill,_minmax(190px,_1fr))]", // Custom grid template columns
      "gap-5",
      "gap-y-[70px]",
      "p-5",
      "w-full",
      "card-container",
      "flex-grow",
      "press-start-2p-regular"
    );

    const selectorContainer = document.createElement("div");
    const label = document.createElement("label");
    label.textContent = "Pokemon per page: ";

    const selector = document.createElement("select");
    selector.classList.add("max-w-sm", "w-full")
    const options = [10, 50, 100];

    options.map((size) => {
      const option = document.createElement("option");
      option.value = size;
      option.textContent = size;
      if (size == pageSize) {
        option.selected = true;
      }
      selector.appendChild(option);
    });

    selector.addEventListener("change", (e) => {
      pageSize = parseInt(e.target.value);
      renderPokemons(1, pageSize);
    });

    const search = document.createElement("input");

    selectorContainer.appendChild(label);
    selectorContainer.appendChild(selector);
    mainContent.appendChild(selectorContainer);

    mainContent.appendChild(search);

    data.forEach((pkm) => {
      const card = document.createElement("article");
      card.classList.add("w-full");

      const wrapper = document.createElement("a");
      wrapper.classList.add(
        "pixelBorder",
        "pixelBorder--2",
        "shadow-lg",
        "wrapper",
        "flex"
      ); // Replaced with Tailwind

      wrapper.href = `/${pkm.id}`;
      const cardImgContainer = document.createElement("div");
      cardImgContainer.classList.add(
        "overflow-hidden",
        "pixelated-bg",
        "mx-4",
        "pixelBorder",
        "pixelBorder--22",
        "mt-4",
        "mb-8"
      );

      const cardImg = document.createElement("img");
      cardImgContainer.appendChild(cardImg);
      cardImg.src = pkm.image_url;

      cardImg.classList.add(
        "img-pixelated",
        "w-full",
        "h-auto",
        "mb-4",
        "scale-110",
        "-mt-4"
      );

      const cardTitle = document.createElement("h2");
      cardTitle.textContent = pkm.name;
      cardTitle.classList.add(
        "text-pop-stroke",
      "text-bold"
    )

      const typeContainer = document.createElement("div");
      const type1 = document.createElement("p");
      const type2 = document.createElement("p");

    type1.classList.add("w-fit")

      type1.innerText = pkm.primary_type;
      type2.innerText = pkm.secondary_type;
      typeContainer.appendChild(type1);
      typeContainer.appendChild(type2);

      card.appendChild(cardImgContainer);
      card.appendChild(cardTitle);
      card.appendChild(typeContainer);

      wrapper.appendChild(card);
      cardContainer.appendChild(wrapper);
    });
    mainContent.appendChild(cardContainer);

    const paginationContainer = document.createElement("div");

    const prevButton = document.createElement("button");
    prevButton.textContent = "Previous";

    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";

    console.log("page", currentPage);
    console.log("pag e", totalPages);
    console.log("FEFW", count);

    nextButton.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
      }
      renderPokemons(currentPage, pageSize);
    });

    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
      }
      renderPokemons(currentPage, pageSize);
    });

    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(nextButton);
    mainContent.appendChild(paginationContainer);
  } else {
    const notFound = document.createElement("h2");
    notFound.textContent = "No pokemons in this Pokedex";
    notFound.classList.add("not-found");
    mainContent.appendChild(notFound);
  }
  return mainContent;
};

export default renderPokemons;
