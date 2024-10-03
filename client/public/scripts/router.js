import renderPokemons from "./pokemons.js";
import renderPokemon from "./pokemon.js";
import renderNotFound from "./404.js";
const routes = {
  "/": renderPokemons,
};

export const handleNavigation = (path) => {
  document.getElementById("main-content").innerHTML = "";
  const pokemonMatch = path.match(/^\/(\d+)$/);
  
  if(pokemonMatch) {
    const id = pokemonMatch[1];
    renderPokemon(id);
    window.history.pushState({}, "", path);
  }

  const renderFunction = routes[path] || renderNotFound; // Default to 404 if route not found

  renderFunction();
  window.history.pushState({}, "", path);
};

window.onpopstate = () => {
  handleNavigation(window.location.pathname);
};

document.addEventListener("DOMContentLoaded", () => {
  handleNavigation(window.location.pathname);
});
