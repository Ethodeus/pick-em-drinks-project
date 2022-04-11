document.addEventListener('DOMContentLoaded', searchCocktail);

document.querySelector('button').addEventListener('click', searchCocktail);

function searchCocktail() {
	const cocktail = document.querySelector('input').value;

	resetDOM();

	fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`)
		.then((res) => res.json())
		.then((data) => {
			const drinks = data.drinks;
			console.log(drinks);

			drinks.forEach((drink) => {
				console.log(drink);
				addToDOM(drink);
			});
		})
		.catch((err) => {
			alert(err);
		});
}

function addToDOM(drink) {
	const div = document.createElement('div');
	div.classList.add('swiper-slide');
	div.classList.add('card');

	div.innerHTML = `
        <div class="card-content">
            <div class="drink-name">
                <h1>${drink.strDrink}</h1>
            </div>

            <div class="image">
                <img src="${drink.strDrinkThumb}" alt="${drink.strDrink} cocktail" />
            </div>

            <div class="ingredients">
                <h4>Ingredients:</h4>
                <ul id='ingredient-list'>${listIngredients(drink)}</ul>
            </div>

            <div class="instructions">
                <h4>Instructions:</h4>
                <p>${drink.strInstructions}</p>
            </div>
        </div>
    `;

	document.querySelector('.swiper-wrapper').appendChild(div);
}

function resetDOM() {
	const cards = document.querySelector('.swiper-wrapper');

	while (cards.firstChild) {
		cards.removeChild(cards.firstChild);
	}
}

function listIngredients(drink) {
	const ingredients = document.getElementById('ingredient-list');
	let str = '';

	for (const [key, value] of Object.entries(drink)) {
		if (key.includes('strIngredient') && value) {
			let measurement = drink['strMeasure' + key.substring(13, key.length)];
			measurement = measurement ? ` (${measurement.trim()})` : '';

			str += `<li>${value + measurement}</li>\n`;
		}
	}

	return str;
}

//To put default elements in the app, put the in the HTML, since JS resets the DOM everytime we start a new search
