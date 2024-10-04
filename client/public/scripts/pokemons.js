let pageSize = 10;
let totalPages = 1;
let currentPage = 1;
let allPokemons = [];  // Store all fetched Pokémon data globally
let filteredPkm = [];  // Store filtered Pokémon

// Fetch Pokémon data and count
const fetchPokemons = async (page, limit) => {
  const response = await fetch(`/pokemons?limit=${limit}&page=${page}`);
  const data = await response.json();
  const countResponse = await fetch("/pokemons/count");
  const count = await countResponse.json();
  return { data, count };
};

// Create select element for changing the number of Pokémon per page
const createPokemonSelector = () => {
  const selectorContainer = document.createElement("div");
  
  const label = document.createElement("label");
  label.classList.add(
    "text-md",
    "font-medium",
    "m-4",
    "press-start-2p-regular",
    "text-pop-stroke"
  );
  label.textContent = "Pokemon per page: ";

  const selector = document.createElement("select");
  selector.classList.add(
    "max-w-[100px]",
    "w-full",
    "p-2.5",
    "m-4",
    "rounded-none",
    "text-sm",
    "press-start-2p-regular",
    "custom-select",
    "Mv"
  );

  [10, 50, 100].forEach((size) => {
    const option = document.createElement("option");
    option.value = size;
    option.textContent = size;
    if (size === pageSize) option.selected = true;
    selector.appendChild(option);
  });

  selector.addEventListener("change", (e) => {
    pageSize = parseInt(e.target.value);
    renderPokemons(1, pageSize);
  });

  selectorContainer.appendChild(label);
  selectorContainer.appendChild(selector);

  return selectorContainer;
};

// Create search bar
const createSearchBar = () => {
  const search = document.createElement("input");
  search.classList.add(
    "w-[1234px]",
    "m-auto",
    "flex",
    "p-2",
    "mb-12",
    "mt-4",
    "text-sm",
    "press-start-2p-regular"
  );
  search.placeholder = "Search Pkm";

  // Add event listener to search and filter Pokémon
  search.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();  // Case-insensitive search
    filteredPkm = allPokemons.filter(pkm => 
      pkm.name.toLowerCase().includes(query)
    );
    updatePokemonCards();  // Re-render Pokémon cards
  });

  return search;
};

// Function to re-render Pokémon cards after filtering
const updatePokemonCards = () => {
  const cardContainer = document.querySelector(".card-container");
  cardContainer.innerHTML = "";  // Clear previous Pokémon cards

  // Add filtered Pokémon cards
  filteredPkm.forEach((pkm) => {
    cardContainer.appendChild(createPokemonCard(pkm));
  });
};

// Create Pokémon card
const createPokemonCard = (pkm) => {
  const card = document.createElement("article");
  card.classList.add("w-full");

  const wrapper = document.createElement("a");
  wrapper.classList.add("pixelBorder", "pixelBorder--2", "shadow-lg", "wrapper", "flex");
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
  cardImg.src = pkm.image_url;
  cardImg.classList.add("img-pixelated", "w-full", "h-auto", "mb-4", "scale-110", "-mt-4");
  cardImgContainer.appendChild(cardImg);

  const cardTitle = document.createElement("h2");
  cardTitle.textContent = pkm.name;
  cardTitle.classList.add("text-pop-stroke", "text-bold");

  const typeContainer = document.createElement("div");
  const type1 = document.createElement("p");
  const type2 = document.createElement("p");
  type1.classList.add("w-fit");
  type1.innerText = pkm.primary_type;
  type2.innerText = pkm.secondary_type;

  typeContainer.appendChild(type1);
  typeContainer.appendChild(type2);

  card.appendChild(cardImgContainer);
  card.appendChild(cardTitle);
  card.appendChild(typeContainer);

  wrapper.appendChild(card);
  
  return wrapper;
};

// Create pagination buttons
const createPagination = () => {
  const paginationContainer = document.createElement("div");
  paginationContainer.classList.add(
    "flex",
    "w-full",
    "justify-center",
    "gap-4",
    "text-pop-stroke",
    "mt-20",
    "mb-10"
  );

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.classList.add("px-4", "py-2", "btnMv", "Mv", "press-start-2p-regular");
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPokemons(currentPage, pageSize);
    }
  });

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.classList.add("px-4", "py-2", "btnMv", "Mv", "press-start-2p-regular");
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderPokemons(currentPage, pageSize);
    }
  });

  paginationContainer.appendChild(prevButton);
  paginationContainer.appendChild(nextButton);

  return paginationContainer;
};

// Render Pokémon cards and other UI elements
const renderPokemons = async (page = 1, limit = 10) => {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";

  const { data, count } = await fetchPokemons(page, limit);
  allPokemons = data;  // Store fetched data globally
  filteredPkm = data;  // Initialize filteredPkm with all Pokémon data

  if (data && !data.error) {
    totalPages = Math.ceil(parseInt(count.count) / limit);

    const cardContainer = document.createElement("section");
    cardContainer.classList.add(
      "grid",
      "grid-cols-[repeat(auto-fill,_minmax(190px,_1fr))]",
      "gap-5",
      "gap-y-[70px]",
      "p-5",
      "w-full",
      "card-container",  // Add class for easy reference
      "flex-grow",
      "press-start-2p-regular"
    );

    // Add select and search elements
    mainContent.appendChild(createPokemonSelector());
    mainContent.appendChild(createSearchBar());

    // Add Pokémon cards (initial render)
    filteredPkm.forEach((pkm) => {
      cardContainer.appendChild(createPokemonCard(pkm));
    });

    mainContent.appendChild(cardContainer);

    // Add pagination
    mainContent.appendChild(createPagination());
  } else {
    const notFound = document.createElement("h2");
    notFound.textContent = "No pokemons in this Pokedex";
    notFound.classList.add("not-found");
    mainContent.appendChild(notFound);
  }
};

export default renderPokemons;
