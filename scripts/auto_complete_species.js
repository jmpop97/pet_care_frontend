const speciesSearchInput = document.querySelector("#species");
const speciesRelContainer = document.querySelector("#species_container");
const speciesUl = document.querySelector("#species_ul");
let speciesCache = "";

const speciesCheckInput = () => {
  const speciesBeforeInput = speciesSearchInput.value;
  speciesTimer(speciesBeforeInput);
}

const speciesTimer = (speciesBeforeInput) => {
  setTimeout(() => {

    if(speciesSearchInput.value === speciesBeforeInput) {
      // console.log("입력멈춤");
      speciesLoadData(speciesSearchInput.value);		// 0.5초 내에 입력창이 변했다면 데이터 로드
      speciesCheckInput();
      
    } else {
      // console.log("입력변함");
      speciesCheckInput();
    }
   
    if(speciesSearchInput.value === "") {		// 입력창이 비었다면 추천 검색어 리스트 숨김
      speciesRelContainer.classList.add("hide");	
    } else {
      speciesRelContainer.classList.remove("hide");
    }
  }, 500);
}

const speciesLoadData = (input) => {
  const speciesUrl = `${backend_base_url}/owner/species?speciessearch=${input}`; // 새로운 URL 생성
  if (speciesCache === speciesUrl) return;
  speciesCache = speciesUrl;

  fetch(speciesUrl)
    .then((speciesRes) => speciesRes.json())
    .then((speciesRes) => {
      console.log(speciesRes);
      speciesFillSearch(speciesRes);
    })
    .catch((err) => {
      console.error(err);
      cache = '';
      li.innerHTML = "서버에서 데이터를 가져오는 중 오류가 발생했습니다.";
      ul.appendChild(li);
    });
};

const speciesFillSearch = (suggestArr) => {
  speciesUl.innerHTML = "";
  console.log(suggestArr)
  if (suggestArr && suggestArr.length > 0) {
    suggestArr.forEach((el) => {
      const { species, breeds } = el;
      if (speciesInputIsSameAsSuggestion(species, breeds)) return;
      const li = document.createElement("li");
      li.innerHTML = species + ' ' + breeds;
      li.addEventListener('click', () => {
        setSpeciesSearchInputValue(species, breeds);
      });
      speciesUl.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    li.innerHTML = "입력하신 종을 확인해주세요.";
    speciesUl.appendChild(li);
  }
};

const speciesInputIsSameAsSuggestion = (speciessearch) => {
  const [inputSpeciessearch = ""] = speciesSearchInput.value;
  return speciessearch === inputSpeciessearch;
};

const setSpeciesSearchInputValue = (speciessearch) => {
  speciesSearchInput.value = `${speciessearch}`;
};

speciesUl.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    speciesSearchInput.value = event.target.textContent;
    speciesRelContainer.classList.add("hide");
  }
});

speciesCheckInput();
