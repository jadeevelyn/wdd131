const POINTS_KEY = "mobTogetherPoints";

function getPoints() {
  return Number(localStorage.getItem(POINTS_KEY)) || 0;
}

function addPoints(amount) {
  const newTotal = getPoints() + amount;
  localStorage.setItem(POINTS_KEY, newTotal);
  updatePointsUI();
}

function updatePointsUI() {
  document.querySelectorAll("[data-points-display]").forEach(el => {
    el.textContent = `${getPoints()} Points`;
  });
}

if (!sessionStorage.getItem("loginBonusGiven")) {
  addPoints(5);
  sessionStorage.setItem("loginBonusGiven", "true");
}

const card = document.querySelector(".idea-card");
const modal = document.getElementById("passModal");
const closeModalBtn = document.getElementById("closeModal");

const ideas = [
  {
    title: "Sunset Volleyball",
    info: "Free • 7 PM • Ruby Beach",
    details: `
      <ul>
        <li>🏐 Casual games</li>
        <li>🕖 7–9 PM</li>
        <li>💵 Free</li>
      </ul>
    `,
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Temple Trip",
    info: "Free • 6 PM • Seattle Temple",
    details: `
      <ul>
        <li>🛕 Seattle Temple</li>
        <li>🕕 6 PM</li>
        <li>💵 Free</li>
      </ul>
    `,
    img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Board Game Night",
    info: "$5 • 8 PM • Relief Society Room",
    details: `
      <ul>
        <li>🎲 Games & snacks</li>
        <li>🕗 8 PM</li>
        <li>💵 $5</li>
      </ul>
    `,
    img: "https://images.unsplash.com/photo-3WceTBlUoMs?auto=format&fit=crop&w=900&q=80"
  }
];

let index = 0;

function loadCard() {
  const idea = ideas[index];
  card.querySelector(".idea-img").style.backgroundImage = `url("${idea.img}")`;
  card.querySelector(".card-front h2").textContent = idea.title;
  card.querySelector(".details").textContent = idea.info;
  card.querySelector(".back-title").textContent = idea.title;
  card.querySelector(".back-text").innerHTML = idea.details;
}

function swipe(direction) {
  card.classList.add(direction === "left" ? "swipe-left" : "swipe-right");

  setTimeout(() => {
    card.classList.remove("swipe-left", "swipe-right", "flipped");
    index = (index + 1) % ideas.length;
    loadCard();
  }, 600);
}

document.getElementById("showDetails").onclick = () =>
  card.classList.add("flipped");

document.getElementById("backBtn").onclick = () =>
  card.classList.remove("flipped");

document.querySelector(".interested").onclick = () => {
  addPoints(1);
  swipe("right");
};

document.querySelector(".not-interested").onclick = () =>
  modal.classList.add("active");

closeModalBtn.onclick = () =>
  modal.classList.remove("active");

document.querySelectorAll(".reason-btn").forEach(btn => {
  btn.onclick = () => {
    addPoints(1);
    modal.classList.remove("active");
    swipe("left");
  };
});

document.querySelector(".submit-reason").onclick = () => {
  addPoints(5);
  modal.classList.remove("active");
  swipe("left");
};

updatePointsUI();
loadCard();
