import recipes from "./recipes.mjs";

function random(num) {
  return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
  const listLength = list.length;
  const randomNum = random(listLength);
  return list[randomNum];
}

// to test
// console.log(getRandomListEntry(recipes));

function tagsTemplate(tags) {
  return tags.map((tag) => `<div class="tag">${tag}</div>`).join("");
}

function ratingTemplate(rating) {
  let ariaLabel = `Rating: ${rating} out of 5 stars`;
  let starHtml = "";

  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      starHtml += `<span aria-hidden="true" class="icon-star">⭐</span>`;
    } else {
      starHtml += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
    }
  }

  let html = `          
  <p>
    <span
    role="img"
      aria-label=${ariaLabel}
    >
      ${starHtml}
    </span>
  </p>`;
  return html;
}

function recipeTemplate(recipe) {
  let tags = tagsTemplate(recipe.tags);
  let rating = ratingTemplate(recipe.rating);

  let titleElement;

  if (recipe.url) {
    titleElement = `<a href=${recipe.url}
        ><h2 class="recipe-title">${recipe.name}</h2></a
      >`;
  } else {
    titleElement = `<h2 class="recipe-title">${recipe.name}</h2>`;
  }

  return `
  <div class="recipe-box">
    <div class="recipe-box-image-container">
      <img
        src=${recipe.image}
        alt=${recipe.name}
        class="recipe-box-img"
      />
    </div>
    <div class="recipe-box-content">
      <div class="tag-container">
        ${tags}
      </div>
      ${titleElement}
      ${rating}
      <p class="recipe-description">
        ${recipe.description}
      </p>
    </div>
  </div>
  `;
}

function filterRecipes(query) {
  const lowerCaseQuery = query.toLowerCase();

  const filteredRecipes = recipes.filter((recipe) => {
    console.log(recipe);
    if (recipe.name.toLowerCase().includes(lowerCaseQuery)) {
      return true;
    }

    if (recipe.description.toLowerCase().includes(lowerCaseQuery)) {
      return true;
    }

    if (recipe.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery))) {
      return true;
    }

    if (
      recipe.recipeIngredient.some((ingredient) =>
        ingredient.toLowerCase().includes(lowerCaseQuery)
      )
    ) {
      return true; 
    }

    return false;
  });

  filteredRecipes.sort((recipeA, recipeB) => {
    const nameA = recipeA.name.toUpperCase();
    const nameB = recipeB.name.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  return filteredRecipes;
}

function renderRecipes(recipeList) {
  const htmlRecipes = recipeList.map((recipe) => recipeTemplate(recipe));
  console.log(htmlRecipes);
  let html = ``;
  htmlRecipes.forEach((recipe) => {
    html += recipe;
  });
  const container = document.getElementById("recipe-list-container");
  container.innerHTML = html;
}

function searchHandler(e) {
  e.preventDefault();
  const searchInput = document.getElementById("recipe-search-input");
  const query = searchInput.value;
  const recipes = filterRecipes(query);
  renderRecipes(recipes);
}

function init() {
  const recipe = getRandomListEntry(recipes);
  return recipeTemplate(recipe);
}

document.addEventListener("DOMContentLoaded", (event) => {
  const sectionElement = document.getElementById("recipe-list-container");
  if (sectionElement) {
    sectionElement.innerHTML = init();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search-button");
  if (searchButton) {
    searchButton.addEventListener("click", searchHandler);
  }
});
