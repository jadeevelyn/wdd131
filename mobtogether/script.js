document.querySelector(".join-btn").addEventListener("click", () => {
    alert("Welcome to the game!");
});

document.querySelector(".pitch-btn").addEventListener("click", () => {
    alert("Pitch form coming soon!");
});

document.querySelector(".not-int").addEventListener("click", () => {
    alert("Marked as NOT interested.");
});

document.querySelector(".yes-int").addEventListener("click", () => {
    alert("Marked as interested!");
});

const ideaCard = document.querySelector(".idea-card");

ideaCard.addEventListener("mouseenter", () => {
    ideaCard.style.transform = "scale(1.03)";
    ideaCard.style.transition = "0.2s";
});

ideaCard.addEventListener("mouseleave", () => {
    ideaCard.style.transform = "scale(1)";
});
