window.onload = ()=>{
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)
    console.log(payload_parse.username)
    
    const intro = document.getElementById("intro")
    intro.innerText = payload_parse.username


    let navbarSignin = document.getElementById("navbar-sign")
    let ndwLi = document.createElement("li")
    newLi.setAttribute("class", 'nav-item')

    let logoutBtn = document.createElement("button")
    logoutBtn.setAttribute("class", "nav-link btn")
    logoutBtn.innerText = "로그아웃"

    newLi.appendChild(logoutBtn)

    navbarRight.appendChild(newLi)

    
}