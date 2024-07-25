let params = new URLSearchParams(document.location.search);
let appid = params.get("append");

const gameName = document.getElementById("game-name");
const gamePrice = document.getElementById("game-price");
const gameImg = document.getElementById("game-image");

const description = document.getElementById("description");
const reviews = document.getElementById("reviews").children[1];
const releaseDay = document.getElementById("release-day").children[1];
const developer = document.getElementById("developer").children[1];

const taglist = document.getElementById("game-genres-list");

console.log(appid);

const getSingleGameDetail = async () => {
  try {
    let url = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/single-game/${appid}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("err", err);
  }
};

const renderGame = async () => {
  try {
    console.log(`loaded ${appid}`);
    const raw = await getSingleGameDetail();
    const data = raw.data;
    console.log(data.name);
    const featureList = document.getElementById("category-game-list");
    gameName.textContent = `${data.name}`;
    gamePrice.textContent = `$${data.price}`;
    gameImg.children[0].src = `${data.header_image}`;
    document.querySelector(
      "body"
    ).style.background = `url("${data.background}")`;
    document.querySelector(
        "body"
      ).style.backgroundSize = `cover`;
    description.textContent = `${data.description}`;
    reviews.textContent = `Very Positive (${data.positive_ratings})`;
    let releaseDate = new Date(data.release_date);
    releaseDay.textContent = releaseDate.toLocaleDateString("en-US");
    developers = data.developer;
    console.log(developers);
    developer.textContent = developers;
    taglist.innerHTML = "";
    data.steamspy_tags.forEach((element) => {
      let x = document.createElement("div");
      x.className = "game-genre";
      x.textContent = element;
      taglist.appendChild(x);
    });
  } catch (error) {
    console.log("err", error);
  }
};

window.addEventListener("load", () => {
  renderGame();
});
