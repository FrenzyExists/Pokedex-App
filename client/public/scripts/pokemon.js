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
      img.classList.add("img");
  

  
      const imgPEContainer = document.createElement("div");
      imgPEContainer.appendChild(img);
  
      imgPEContainer.classList.add("img-pe-container");
  
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
  