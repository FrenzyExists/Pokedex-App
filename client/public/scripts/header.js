const header = document.querySelector('header');

const headerContainer = document.createElement('div');
headerContainer.classList.add(
    "max-h-[10vh]",   // max-height: 10vh;
    "h-[10vh]",       // height: 10vh;
    "flex",           // display: flex;
    "justify-between",// justify-content: space-between;
    "pl-4",           // padding-left: 1rem;
    "pr-4",           // padding-right: 1rem;
    "pt-2",           // padding-top: 0.5rem;
    "pb-2",            // padding-bottom: 0.5rem;
    "header",
    "items-center",
    "border-b-4",
    "press-start-2p-regular"
  );
const headerLeft = document.createElement('div');
headerLeft.className = 'header-left';

const headerRight = document.createElement('div');
headerRight.className = 'header-right';

const headerTitle = document.createElement('h1');
headerTitle.classList.add("text-5xl", "text-pop-stroke", )
headerTitle.textContent = "A Pokedex";

const headerButton1 = document.createElement('button');
headerButton1.classList.add("p-4", "btn", "text-pop-stroke", "text-2xl")
const headerButton2 = document.createElement('button');
headerButton2.classList.add("p-4", "btn", "text-pop-stroke", "text-2xl")

headerButton1.textContent = 'All Pokemon'
headerButton2.textContent = 'By Type'

headerButton1.classList.add('homeBtn');
// homeBtnb
headerButton1.classList.add('homeBtnb');
headerButton2.classList.add('homeBtn');
headerButton2.classList.add('homeBtnb');

headerButton1.addEventListener('click', function handleClick(event) {
    window.location = '/pokemons'
});

headerButton2.addEventListener('click', function handleClick(event) {
    window.location = '/by_type'
});

headerLeft.appendChild(headerTitle);

headerRight.appendChild(headerButton1);
headerRight.appendChild(headerButton2);

headerContainer.appendChild(headerLeft);
headerContainer.appendChild(headerRight);

header?.appendChild(headerContainer)
