// GET ELEMENTS
const card = document.querySelector(".idea-card");
const showDetails = document.getElementById("showDetails");
const backBtn = document.getElementById("backBtn");
const notInterestedBtn = document.querySelector(".not-interested");
const interestedBtn = document.querySelector(".interested");

// ---- FLIP CARD ----
showDetails.addEventListener("click", () => {
  card.classList.add("flipped");
});

backBtn.addEventListener("click", () => {
  card.classList.remove("flipped");
});


// ---- SWIPE ANIMATION ----
function loadNewCard() {
  // Reset flip state
  card.classList.remove("flipped");

  // Reset swipe animations
  card.classList.remove("swipe-left", "swipe-right");

  // Fade in new card
  card.classList.add("fade-in");

  setTimeout(() => {
    card.classList.remove("fade-in");
  }, 500);
}


// Not Interested → swipe left
notInterestedBtn.addEventListener("click", () => {
  card.classList.add("swipe-left");

  setTimeout(() => {
    loadNewCard();
  }, 600);
});


// Interested → swipe right
interestedBtn.addEventListener("click", () => {
  card.classList.add("swipe-right");

  setTimeout(() => {
    loadNewCard();
  }, 600);
});
// ===== PRELOADED IDEAS =====
const ideas = [
  {
    title: "Sunset Volleyball",
    info: "Cost: Free • Time: 7 PM • Location: Provo Beach Courts",
    details: `
      Join us for a fun, casual volleyball evening!
      <ul>
        <li>📍 Provo Beach Courts</li>
        <li>🕖 7–9 PM</li>
        <li>💵 Free</li>
        <li>👟 Bring: Shoes, sunscreen</li>
      </ul>
    `,
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Temple Trip",
    info: "Cost: Free • Time: 6 PM • Location: Provo Temple",
    details: `
      Join us for a peaceful and uplifting temple trip!
      <ul>
        <li>📍 Provo Temple</li>
        <li>🕕 6 PM</li>
        <li>💵 Free</li>
      </ul>
    `,
    img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Board Game Night",
    info: "$5 • Time: 8 PM • Heritage Hall",
    details: `
      Bring your competitive side!
      <ul>
        <li>🎲 Games & Snacks provided</li>
        <li>🕗 8 PM</li>
        <li>💵 $5 entry</li>
      </ul>
    `,
    img: "https://unsplash.com/photos/person-in-white-shirt-sitting-beside-table-with-puzzle-game-NrS53eUKgiE?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
      
  }
];

let index = 0;

function loadCard() {
  const card = document.querySelector(".idea-card");
  const idea = ideas[index];

  card.querySelector(".idea-img").style.backgroundImage = `url("${idea.img}")`;
  card.querySelector(".card-front h2").textContent = idea.title;
  card.querySelector(".card-front .details").textContent = idea.info;

  card.querySelector(".card-back").innerHTML = `
    <h2>${idea.title}</h2>
    <p>${idea.details}</p>
    <button class="back-btn" id="backBtn">Back</button>
  `;
  attachEvents();
  card.classList.add("fade-in");
  setTimeout(() => card.classList.remove("fade-in"), 500);
}

function swipe(direction) {
  const card = document.querySelector(".idea-card");

  if (direction === "left") card.classList.add("swipe-left");
  else card.classList.add("swipe-right");
  setTimeout(() => {
    card.classList.remove("swipe-left", "swipe-right", "flipped");
    index++;
    if (index >= ideas.length) index = 0;

    loadCard();
  }, 600);
}
function attachEvents() {
  const card = document.querySelector(".idea-card");
  const showBtn = document.getElementById("showDetails");
  const backBtn = document.getElementById("backBtn");
  const yesBtn = document.querySelector(".interested");
  const noBtn = document.querySelector(".not-interested");

  showBtn.onclick = () => card.classList.add("flipped");
  backBtn.onclick = () => card.classList.remove("flipped");

  yesBtn.onclick = () => swipe("right");
  noBtn.onclick = () => swipe("left");
}
loadCard();
      