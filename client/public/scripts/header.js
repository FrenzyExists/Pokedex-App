const header = document.querySelector('header');

const headerContainer = document.createElement('div');
headerContainer.className = 'header-container';

const headerLeft = document.createElement('div');
headerLeft.className = 'header-left';

const headerRight = document.createElement('div');
headerRight.className = 'header-right';

const headerTitle = document.createElement('h1');
headerTitle.textContent = "A Pokedex";

const headerButton1 = document.createElement('button');
const headerButton2 = document.createElement('button');

headerButton1.textContent = 'All Pokemon'
headerButton2.textContent = 'By Type'


headerButton1.classList.add('homeBtn');
// homeBtnb
headerButton1.classList.add('homeBtnb');
headerButton2.classList.add('homeBtn');
headerButton2.classList.add('homeBtnb');

headerButton1.addEventListener('click', function handleClick(event) {
    window.location = '/pokemons'
})

headerButton2.addEventListener('click', function handleClick(event) {
    window.location = '/by_type'
})


headerLeft.appendChild(headerTitle);

headerRight.appendChild(headerButton1);
headerRight.appendChild(headerButton2);

headerContainer.appendChild(headerLeft);
headerContainer.appendChild(headerRight);

header?.appendChild(headerContainer)
