import recipes from './recipes.mjs';

const container = document.querySelector('.recipe-list');

function renderStars(rating) {
  const max = 5;
  let stars = '';
  for (let i = 1; i <= max; i++) {
    stars += i <= rating ? '⭐' : '☆';
  }
  return stars;
}

recipes.forEach(recipe => {
  const card = document.createElement('div');
  card.classList.add('recipe-card');

  card.innerHTML = `
    <img src="${recipe.image}" alt="${recipe.name}">
    <div>
      <span class="tag">${recipe.tags[0]}</span>
      <h2 class="recipe-title">${recipe.name}</h2>
      <p class="recipe-description">${recipe.description}</p>
      <span class="rating" role="img" aria-label="Rating: ${recipe.rating} out of 5">
        ${renderStars(recipe.rating)}
      </span>
    </div>
  `;

  container.appendChild(card);
});
