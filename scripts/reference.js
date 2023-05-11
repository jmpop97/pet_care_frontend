// 2,3주차 front강의보면서 적었던 주석들입니다 참고용

// 2주차 index.js
// js 따로 공부해야함.. 아래 코드정도는 이해될 정도로
// 웹서버에서 언제 요청올지 모르니 다른거 먼저 하고있어라!
window.onload = async function loadArticles(){
    const response = await fetch('http://127.0.0.1:8000/articles/', {method: 'GET'}) // 띄울 경로 주소와 메소드

    response_json = await response.json()


    const articles = document.getElementById("articles")

    response_json.forEach(element => {
        const newArticle = document.createElement("div")
        newArticle.innerText = element.title
        articles.appendChild(newArticle)

    });

}

// 3주차 index.js
// CORS에 대한 이해가 필요 CORS 에러
// Origin(주소와 포트)이 다른곳 Cross-Origin 주소가 다름
// 다른 브라우저에서 요청을 보낼 땐 허용이 필요함 악용가능성이 있으니까
// django cors 검색해서 git에 뜬거 튜토리얼 시작
// https://github.com/adamchainz/django-cors-headers

console.log('로딩되었습니다')

window.onload = ()=>{
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)
    console.log(payload_parse.email)
    
    
    const intro = document.getElementById("intro")
    intro.innerText = payload_parse.email

}

// api.js
window.onload = ()=>{ //브라우저 로드 되자마자 실행할 내용들 이내용들을 위로 빼주면 script 위로 해도 상관없는거??라는식으로 말씀하심
    console.log("로딩되었음")
}

async function handleSignup(){ // document = html
    const email = document.getElementById("email").value //.value로 email의 그 값을 가져오기
    const password = document.getElementById("password").value
    console.log(email, password)

    //async 와 await 공부하기! await를 걸어준 줄부터 여기서 데이터 올때까지 기다려! 안넘어감 하는 역할
    const response = await fetch('http://127.0.0.1:8000/users/signup/',{
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body: JSON.stringify({
            "email":email,
            "password":password
        })
    })
    console.log(response)
}
// body내용은 쌍따옴표 안하면 틀리나?
// 검색어 fetch application json

//뭔가 js 항상 만들 때 버튼이 눌러지고 있는 상황인지 체크하는게 좋다고 합니다
async function handleLogin() {
    const email = document.getElementById("email").value //.value로 email의 그 값을 가져오기
    const password = document.getElementById("password").value
    console.log(email, password)

    const response = await fetch('http://127.0.0.1:8000/users/api/token/',{
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body: JSON.stringify({
            "email":email,
            "password":password
        })
    })
    const response_json = await response.json()

    console.log(response_json)
    localStorage.setItem("access", response_json.access);
    localStorage.setItem("refresh", response_json.refresh);

    const base64Url = response_json.access.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    localStorage.setItem("payload", jsonPayload);

}
// how to save local storage 검색

async function handleMock(){
    const response = await fetch('http://127.0.0.1:8000/users/mock/',{
        headers:{
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method:"GET",
    })
    console.log(response)
}

function handleLogout(){
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("payload");
}