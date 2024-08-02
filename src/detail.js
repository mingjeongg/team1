// window.location.search 로 키와 값 확인하기
const myKeyValue = window.location.search;
console.log("key & value:", myKeyValue);

// URL 검색매개변수(URLSearchParams)에 location.search를 인자로 넣어줌
const URLSearch = new URLSearchParams(myKeyValue);

// get으로 id값 가져오기
let id = URLSearch.get("id");
console.log("id:", id);

// 특정한 id값을 받는 영화에 대한 정보를 불러오는 api
async function fetchMovieContent() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWM3NWQyZTlmNjY0YjA1NGRjYjY2OTBkN2IzYTFiYiIsIm5iZiI6MTcyMTczMzYwMC45MjI2NzgsInN1YiI6IjY2OWY5MDdlMTgxOWIxOWYzNjQ3Y2QyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yHUwz42hALvhTOCinYIe05Ety4uH2p5w--kbSnm8r9g`,
    },
  };
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    options
  );
  const data = await response.json();
  console.log(data);
  return data;
}
fetchMovieContent()
  .then((results) => {
    // 위 api에서 받아오는 영화정보 출력
    const detailBox = document.querySelector(".detailBox");
    detailBox.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${results.poster_path}" alt="${results.title}">
        <div class="detailcontents">
        <h3 class="datailTitle">${results.title}</h3>
        <p>${results.overview}</p>
        <p>Release date : ${results.release_date}</p>
        <p>Ratings : ${results.vote_average}</p></div>
      `;
  })
  .catch((err) => console.error(err));