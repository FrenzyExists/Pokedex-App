const renderPokemons = async () => {
  const mainContent = document.getElementById("main-content");

  const response = await fetch("/pokemons");
  const data = await response.json();

  if (data && !data.error) {
    const cardContainer = document.createElement("section");

    const selectorContainer = document.createElement("div");
    const label = document.createElement("label");
    label.textContent = "Pokémon per page: ";
    const selector = document.createElement("select");
    const options = [10, 50, 100];
    selectorContainer.appendChild(label);
    selectorContainer.appendChild(selector);
    mainContent.prepend(selectorContainer);  // Add selector at the top
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
