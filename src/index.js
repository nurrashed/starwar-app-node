// variables
const urlBase = "https://swapi.dev/api/people/?page=";
const pageText = document.getElementById("pageNumber");
const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
let page = 1;

const getData = async () => {
  const url = urlBase + page;
  const response = await fetch(url);
  const data = await response.json();
  const appDiv = document.querySelector(".app");
  let appmainHtml = "";

  // pagination
  pageText.innerText = page;
  if (page === 1) {
    prevPage.disabled = true;
  } else {
    prevPage.disabled = false;
  }
  if (data.results.length < 10) {
    nextPage.disabled = true;
  } else {
    nextPage.disabled = false;
  }

  data.results.forEach((person) => {
    appmainHtml += `
        <div class='appmain-wrapper card'>
        <div class='appmain'>
            <h3>${person.name}</h3>
            <span class='appmain__info'>
                <span>Height: ${person.height} cm</span>
                <span>Mass: ${person.mass} Kg</span>
            </span>
        </div>
        <div class='appmain__content'>
            <div class='appmain__name'>Person Name: ${person.name}</div>
            <div class='appmain__tagline'>Gender: ${person.gender}</div>
            <div class='appmain__description'>Skin Color: ${person.skin_color}</div>            
        </div>
    </div>`;
  });
  appDiv.innerHTML = appmainHtml;
};

// pagination
prevPage.addEventListener("click", () => {
  page--;
  getData();
});
nextPage.addEventListener("click", () => {
  page++;
  getData();
});

getData();
