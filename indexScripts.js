const btnSubmit=document.getElementById("btn-search");

const getAllGame = async (page, genres) => {
  try {
    let url = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games?limit=25`;

    url += `&page=${page}`;
    url += genres ? `&genres=${genres}` : "";

    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("err", err);
  }
};

const searchGame = async (page, keyword) => {
  try {
    let url = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games?limit=25`;

    url += `&page=${page}`;
    url += keyword ? `&q=${keyword}` : "";
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("err", err);
  }
};
const getGenres = async (page) => {
  try {
    let url = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/genres?limit=30`;

    url += `&page=${page}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("err", err);
  }
};
const getFeaturedGame = async (page) => {
  try {
    let url = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/features`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("err", err);
  }
};
const getSingleGameDetail = async () => {
  try {
    let url = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/single-game/:appid`;

    url += `&page=${page}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("err", err);
  }
};

const renderFeaturedGames = async () => {
  try {
    console.log("loaded");
    const data = await getFeaturedGame();
    const featureList = document.getElementById("featured-game-list");
    const ulFeList = featureList.children[1];
    ulFeList.innerHTML = "";
    console.log(data);
    console.log(data.data);
    data.data.forEach((game, index) => {
      let card = `
          
                <div class="front-card" onclick=redirectGameDetails(${game.appid})>
                  <img
                    class="work-image"
                    src="${game.header_image}"
                    alt="${game.background}"
                    srcset=""
                  />
                  <div id="game-infor-price">
                  <p class="work-name">${game.name}</p>
                  <div class="address-list">
                   <p>$${game.price}</p>
                  </div>
                </div>
  
                </div>
              
            `;
      let x = document.createElement("div");
      x.className = "card";
      x.innerHTML = card;
      ulFeList.appendChild(x);
    });
  } catch (error) {
    console.log("err", error);
  }
};
const renderGames = async (page,gen) => {
  try {
    console.log(`loaded ${gen}`);
    const data = await getAllGame(page, gen);
    const featureList = document.getElementById("category-game-list");
    const ulFeList = featureList.children[1];
    ulFeList.innerHTML = "";
    const genres = featureList.children[0];
    genres.textContent =gen? `${gen} results`: `ALL RESULTS`;
    console.log(data);
    console.log(data.data);
    data.data.forEach((game, index) => {
      let card = `
          
                <div class="front-card" onclick=redirectGameDetails(${game.appid})>
                  <img
                    class="work-image"
                    src="${game.header_image}"
                    alt="${game.background}"
                    srcset=""
                  />
                  <div id="game-infor-price">
                  <p class="work-name">${game.name}</p>
                  <div class="address-list">
                   <p>$${game.price}</p>
                  </div>
                </div>
  
                </div>
              
            `;
      let x = document.createElement("div");
      x.className = "card";
      x.innerHTML = card;
      ulFeList.appendChild(x);
    });
    const pageTotal=document.getElementById("paging-games");
    const pageList=pageTotal.children[0];
    makePaging(data.total,25,"paging-games","gen",gen,page);
  } catch (error) {
    console.log("err", error);
  }
};


const renderSearch = async (page,keyword) => {
  try {
    console.log(`loaded ${keyword}`);
    const data = await searchGame(page, keyword);
    const featureList = document.getElementById("category-game-list");
    const ulFeList = featureList.children[1];
    ulFeList.innerHTML = "";
    const genres = featureList.children[0];
    genres.textContent =`Search Results For "${keyword}"`;
    console.log(data);
    console.log(data.data);
    data.data.forEach((game, index) => {
      let card = `
          
                <div class="front-card" >
                  <img
                    class="work-image"
                    src="${game.header_image}"
                    alt="${game.background}"
                    srcset=""
                  />
                  <div id="game-infor-price">
                  <p class="work-name">${game.name}</p>
                  <div class="address-list">
                   <p>$${game.price}</p>
                  </div>
                </div>
  
                </div>
              
            `;
      let x = document.createElement("div");
      x.className = "card";
      x.innerHTML = card;
      ulFeList.appendChild(x);
    });
    const pageTotal=document.getElementById("paging-games");
    const pageList=pageTotal.children[0];
    makePaging(data.total,25,"paging-games","search",keyword,page);
  } catch (error) {
    console.log("err", error);
  }
};

const renderGenre= async (page)=>{
  try {
    console.log("loaded genred");
    const data = await getGenres(page);
    const featureList = document.getElementById("category-container");
    const ulFeList = featureList.children[0];
    ulFeList.innerHTML = "";
    console.log(data)
    data.data.forEach((game, index) => {
      let name=`${game.name}`;
      let x = document.createElement("a");
      x.className = "game-genre";
      x.innerText=game.name;
      // x.setAttribute("onclick",`renderGames(1,${name})`);
      x.setAttribute("onclick",`renderGames(1,"${name}")`);
      ulFeList.appendChild(x);
    });

    
  } catch (error) {
    console.log("err", error);
  }
}


const makePaging=(total,limit,paginSection,searchorgame,key,page)=>{
  console.log(page+"c");
  const totalPage=caculatePages(total,limit);
  const currentPage=page-1;
  console.log(limit)
  const section=document.getElementById("paging-games").children[0];
  section.innerHTML="";
 
  let fuName;
  if(searchorgame=="search"){
    fuName="renderSearch";
  }else{
    fuName="renderGames";
  }
  key=key?`"${key}"`:"";
  console.log(typeof(key));
  for(let i=0;i<totalPage;i++){
    let y=document.createElement("div");
    let active=currentPage==i?"active":"";
    let hidden=((currentPage+1)==i||(currentPage-1)==i||(currentPage==i)||i==0|i==totalPage-1)?"":"hidden";
    y.className="pagination";
    section.appendChild(y);
    y.innerHTML=`<a href="#" onclick=${fuName}(${i+1},${key}) ${active} ${hidden}>${i+1}</a>`;
    console.log(currentPage);
    if((currentPage+1)==i||(currentPage-1)==i||i==1|i==totalPage-1){
      console.log(currentPage+"a");
    }
    // y.innerHTML=`<a href="#" onclick="`+
    // fuName+`(`+`${i+1}`+`,"`+${key}`"`+`)">`+`${i+1}`+`</a>`;

    section.appendChild(y);
  }

}


const redirectGameDetails=(append)=>{
  window.location.href=`./gameDetail.html?append=${append}`;
}
window.addEventListener("load", () => {
  renderFeaturedGames();
  renderGames(1,"");
  renderGenre(1);
});

btnSubmit.addEventListener("click", ()=>{
  keyword=document.getElementById("search-bar").value;
  renderSearch(1,keyword);
 console.log(document.getElementById("search-bar").value)
})

const caculatePages = (total, limit) => {
  return Math.ceil(total / limit);
};

