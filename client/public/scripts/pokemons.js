
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

    const selectorContainer = document.createElement("div");
    const label = document.createElement("label");
    label.textContent = "Pokémon per page: ";

    const selector = document.createElement("select");
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

    selector.addEventListener("change", e => {
        pageSize = parseInt(e.target.value);
        renderPokemons(1, pageSize)
    })

    selectorContainer.appendChild(label);
    selectorContainer.appendChild(selector);
    mainContent.appendChild(selectorContainer);

    data.forEach((pkm) => {
      const card = document.createElement("article");
      card.classList.add("card");
      const wrapper = document.createElement("a");
      wrapper.href = `/${pkm.id}`;
      const cardImg = document.createElement("img");
      cardImg.src = pkm.image_url;
      cardImg.classList.add("card-img");
      const cardTitle = document.createElement("h2");
      cardTitle.textContent = pkm.name;

      const typeContainer = document.createElement("div");
      const type1 = document.createElement("p");
      const type2 = document.createElement("p");
      type1.innerText = pkm.primary_type;
      type2.innerText = pkm.secondary_type;
      typeContainer.appendChild(type1);
      typeContainer.appendChild(type2);

      card.appendChild(cardImg);
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
    

    
    nextButton.addEventListener("click", ()=> {
        if(currentPage < totalPages) {
            currentPage++;
        }
        renderPokemons(currentPage, pageSize)
    })

    prevButton.addEventListener("click", ()=> {
        if(currentPage > 1) {
            currentPage--;
        }
        renderPokemons(currentPage, pageSize)
    })


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
