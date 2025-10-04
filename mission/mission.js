const themeSelector = document.querySelector("#theme-select");
const logo = document.querySelector("#logo");

function changeTheme() {
  if (themeSelector.value === "dark") {
    document.body.classList.add("dark");
    logo.src = "byui-logo_white.png";
    console.log("Switched to dark, logo:", logo.src);
  } else {
    document.body.classList.remove("dark");
    logo.src = "byui-logo_blue.webp";
    console.log("Switched to light, logo:", logo.src);
  }
}
themeSelector.addEventListener("change", changeTheme);
