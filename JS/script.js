const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTZlNzIxZDJjN2Y5ODVmNzAwMWE3YjQ4NWJhMmVjMyIsInN1YiI6IjY2Mjg2MGQ3YjlhMGJkMDE3YWQ5MWI1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-0aPJSDHH6Brnhdo7vftgxHhaXWogIy5jO204LhvF6Q'
    }
  };  //get 방식으로 TMDB에서 json 형식으로 데이터 받아오기
fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options) //TMDB API주소와 옵션을 전달하여 GET요청을 보냅니다.

    .then(response => response.json()) //응답을 받으면 응답
    .then((response) => {                  //변환한 데이터 출력
        const movies = response.results; //영화 목록 추출
        const moviesArea = document.getElementById("card");

        function movieList(val = "") {
            moviesArea.innerHTML = "";
            const res = movies
              .map((movie) => {
                if (movie.title.toLowerCase().includes(val)) {
                  return `
                <div class="movie-card" onclick="showAlert(${movie.id})"> 
                    <img class="poster" src= "https://image.tmdb.org/t/p/w500/${movie.poster_path}"/>   
                    <h3>${movie.title}</h3>  
                    <p>${movie.overview}</p>  
                    <p> Rating : ${movie.vote_average}</p>  
                </div>   
                `; // HTML 템플릿에 카드 추가  
                    } // html 템플릿 추가
                })
                .join("");
            moviesArea.innerHTML = res;
        }
        movieList();
//검색 기능 구현을 위한 search id 가져오기
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');


searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const val = searchInput.value;
    console.log(val);
    movieList(val);
  });
})
.catch((err) => console.error(err));

// 영화 id 알림창 띄우기
function showAlert(id) {
alert("영화 id: " + id);
}