// includeHTML파일 대신 fetch로 뿌려주기 (컴포넌트화, 프로젝트 아키텍쳐)
async function injectNavbar() {
    fetch("./header.html").then(response => {
        return response.text()
    })
        .then(data => {
            document.querySelector("header").innerHTML = data;
        })
    let navbarHtml = await fetch("./header.html")
    let data = await navbarHtml.text()
    document.querySelector("header").innerHTML = data;


    const payload = localStorage.getItem("payload");
    if (payload) {
        const payload_parse = JSON.parse(payload)


        const intro = document.getElementById("intro")
        intro.innerText = `${payload_parse.username}님`

        const mypage = document.getElementById("mypage")
        mypage.innerText = "마이페이지"


        let navbarRight = document.getElementById("navbar-right")
        let newLi = document.createElement("li")
        newLi.setAttribute("class", "nav-item")

        let logoutBtn = document.createElement("button")
        logoutBtn.setAttribute("class", "nav-link btn")
        logoutBtn.innerText = "로그아웃"
        logoutBtn.setAttribute("onClick", "handleLogout()")

        newLi.appendChild(logoutBtn)

        navbarRight.appendChild(newLi)


        let signInButton = document.getElementById("navbar-signin")
        signInButton.style.display = "none";
        let signUpButton = document.getElementById("navbar-signup")
        signUpButton.style.display = "none";
    }
}

injectNavbar();

function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    location.reload()
}
// sytle.display = "none";을 줬으면 다시 block같은거로 바꿔줘야함
// 여기선 relaod()가 새로고침이라 모든 했던 자바스크립트 기록이 사라져서 없어도 괜찮은 것