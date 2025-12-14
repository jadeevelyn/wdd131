const POINTS_KEY = "mobTogetherPoints";

function getPoints() {
  return Number(localStorage.getItem(POINTS_KEY)) || 0;
}

function addPoints(amount) {
  const newTotal = getPoints() + amount;
  localStorage.setItem(POINTS_KEY, newTotal);
  updatePointsUI();
}

function spendPoints(amount) {
  const current = getPoints();
  if (current >= amount) {
    localStorage.setItem(POINTS_KEY, current - amount);
    updatePointsUI();
    alert("Reward redeemed!");
  }
}

function updatePointsUI() {
  document.querySelectorAll("[data-points-display]").forEach(el => {
    el.textContent = `${getPoints()} Points`;
  });
}

function getPoints() {
  return Number(localStorage.getItem(POINTS_KEY)) || 0;
}

function setPoints(amount) {
  localStorage.setItem(POINTS_KEY, amount);
  updateUI();
}

function spendPoints(cost) {
  const currentPoints = getPoints();

  if (currentPoints < cost) return;

  setPoints(currentPoints - cost);
  alert("Reward redeemed!");
}

function updateUI() {
  const points = getPoints();

  const pointsEl = document.getElementById("leaderPoints");
  if (pointsEl) {
    pointsEl.textContent = points;
  }

  document.querySelectorAll(".reward-btn").forEach(btn => {
    const cost = Number(btn.dataset.cost);

    if (points >= cost) {
      btn.disabled = false;
      btn.classList.remove("disabled");
      btn.textContent = "Redeem";
    } else {
      btn.disabled = true;
      btn.classList.add("disabled");
      btn.textContent = "Need more points";
    }
  });
}
document.addEventListener("DOMContentLoaded", updatePointsUI);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".reward-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const cost = Number(btn.dataset.cost);
      spendPoints(cost);
    });
  });

  updateUI();
});

