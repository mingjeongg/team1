//fetch request
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWM3NWQyZTlmNjY0YjA1NGRjYjY2OTBkN2IzYTFiYiIsIm5iZiI6MTcyMTczMzYwMC45MjI2NzgsInN1YiI6IjY2OWY5MDdlMTgxOWIxOWYzNjQ3Y2QyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yHUwz42hALvhTOCinYIe05Ety4uH2p5w--kbSnm8r9g",
  },
};

// 1. <div class="container"></div> 아래에 붙이기 위함
// 2. 부모인 container에 클릭 이벤트 헨들러 심어놓기 위함
const container = document.querySelector(".container");
let originResults;
// fetch로는 데이터를 바로 사용할 수 없다. fetch를 사용할 땐 두 단계를 거쳐야 한다.
// 1. 올바른 url로 요청을 보내기
// 2. 뒤에오는 응답에 대해 json()해주기
fetch("https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1", options)
  .then((response) => response.json())
  .then((data) => {
    console.log(data); //객체 {page: 1, results: Array(20), total_pages: 476, total_results: 9515}

    const { page, results, total_pages, total_results } = data; //구조분해할당

    originResults = results;
    console.log("results : ", results); //배열 [{…}, {…}, {객체},  ..... , {…}, {…}]

    // container에 붙이기
    container.innerHTML = results.map((results) =>
          `  <div class="movieItem" id="${results.id}">
        <img src="https://image.tmdb.org/t/p/w500${results.poster_path}" alt="">
          <h3 id="h3">${results.title}</h3>
      </div>
    `
//    <p>${results.overview}</p>
//    <p>평점 : ${results.vote_average}</p>
      )
      .join("");
  })
  .catch((err) => console.error(err));


  // 메인 -> 상세
  container.addEventListener("click", handleClickCard);
  function handleClickCard(e){
   if(e.target === container) return; //카드말고 그 외 영역(container) 클릭했을때 

   if(e.target.matches(".movieItem")){ // div클릭시
    window.location.href =`detail.html?id=${e.target.id}`;
   }else{ // div 안에 이미지, h태그 등 클릭 시 
    window.location.href =`detail.html?id=${e.target.parentNode.id}`;
  }
}


// === 마우스 클릭 ===
document.getElementById("movieBtn").addEventListener("click", (e) => {
  e.preventDefault();
  search();
});

// === 엔터키 클릭 ===
window.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    search();
  }
});

//=== 검색 함수 ===
function search() {
  
  // input값 가져오기
  const inputValue = document.getElementById("movieInput");
  const valInput = inputValue.value;

  if (valInput === "") {
    alert("영화를 입력해주세요.");
  } else {
    // title 가져오기
    const titles = document.querySelectorAll("h3");

    // div영역 가져오기
    const items = document.querySelectorAll(".movieItem");
    //console.log("itemDivs", items);

    titles.forEach((title, idx) => {
      const val = title.innerText;
      const valLow = val.toLocaleLowerCase();
      const valInputLow = valInput.toLocaleLowerCase();
      const isVisible = valLow.includes(valInputLow);

      if (isVisible) {
        items[idx].style.display = "block";
      } else {
        items[idx].style.display = "none";
      }
    });
  }
}

//인기순 정렬
document.querySelector("#label1").addEventListener("click", function () {
  sortPopularity(originResults);
});

function sortPopularity(results) {
  results.sort(function (a, b) {
    return b.popularity - a.popularity;
  });

  container.innerHTML = results
    .map(
      (results) =>
        `  <div class="movieItem" id="${results.id}">
    <img src="https://image.tmdb.org/t/p/w500${results.poster_path}" alt="">
  
  </div>
`
    )
    .join("");
}

// 최신순 정렬
document.querySelector("#label2").addEventListener("click", function () {
  sortNewest(originResults);
});

function sortNewest(results) {
  results.sort(function (a, b) {
    return new Date(b.release_date) - new Date(a.release_date);
  });

  container.innerHTML = results
    .map(
      (results) =>
        `  <div class="movieItem" id="${results.id}">
    <img src="https://image.tmdb.org/t/p/w500${results.poster_path}" alt="">

  </div>
`
    )
    .join("");
}