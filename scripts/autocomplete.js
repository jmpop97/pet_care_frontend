const ul = document.querySelector(".pop_rel_keywords");
const searchInput = document.querySelector(".search_input");
const relContainer = document.querySelector(".rel_search");
let cache = "";

const checkInput = () => {
  const beforeInput = searchInput.value;
  timer(beforeInput);
}

const timer = (beforeInput) => {
  setTimeout(() => {

    if(searchInput.value === beforeInput) {
      console.log("입력멈춤");
      loadData(searchInput.value);		// 0.5초 내에 입력창이 변했다면 데이터 로드
      checkInput();
      
    } else {
      console.log("입력변함");
      checkInput();
    }
   
    if(searchInput.value === "") {		// 입력창이 비었다면 추천 검색어 리스트 숨김
      relContainer.classList.add("hide");	
    } else {
      relContainer.classList.remove("hide");
    }
  }, 500);
}

const loadData = (input) => {
  const [city, state = ""] = input.split(" "); // 입력된 값을 공백을 기준으로 분리하여 city와 state 변수에 할당하되, state는 기본값 ""으로 설정
  const url = `http://127.0.0.1:8000/owner/location?city=${city}&state=${state}`; // 새로운 URL 생성
  if(cache === url) return;
  else {
      cache = url;
      fetch(url)
          .then((res) => res.json())
          .then((res) => {
              console.log(res); // 전달된 데이터 출력
              fillSearch(res);
          })
          .catch((err) => {
              console.error(err);
              // 에러 발생 시, 캐시를 초기화하여 다음 요청 시 다시 데이터를 가져올 수 있도록 함
              cache = '';
              li.innerHTML = "서버에서 데이터를 가져오는 중 오류가 발생했습니다.";
              ul.appendChild(li);
          });
  }
}

const fillSearch = (suggestArr) => {
  ul.innerHTML = "";
  console.log(suggestArr)
  if (suggestArr && suggestArr.length > 0) {
    suggestArr.forEach((el) => {
      const { city, state } = el;
      if (inputIsSameAsSuggestion(city, state)) return;
      const li = document.createElement("li");
      li.innerHTML = city + ' ' + state;
      li.addEventListener('click', () => {
        setSearchInputValue(city, state);
      });
      ul.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    li.innerHTML = "입력하신 지역을 확인해주세요.";
    ul.appendChild(li);
  }
};

const inputIsSameAsSuggestion = (city, state) => {
  const [inputCity, inputState = ""] = searchInput.value.split(" ");
  return city === inputCity && state === inputState;
};

const setSearchInputValue = (city, state) => {
  searchInput.value = `${city} ${state}`;
};

ul.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    searchInput.value = event.target.textContent;
    relContainer.classList.add("hide");
  }
});

checkInput();
