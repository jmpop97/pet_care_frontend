// navbar 버튼이 아닌 주소로 signup.html쳐서 들어갔을때 로그인상태면 redirect하는 함수
// api.js가 맨위에서 실행되어야 오류없이 실행됨
function checkSignin() {
    const payload = localStorage.getItem("payload");
    if(payload){
        window.location.replace(`${frontend_base_url}`)
    }
}

checkSignin()

// Signin 함수
async function handleSignin() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    console.log(username, password)

    const response = await fetch(`${backend_base_url}/user/api/token/`,{
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body: JSON.stringify({
            "username":username,
            "password":password
        })
    })
    console.log(response)
    return response
}

// Signin이라는 함수는 데이터 통신만 하고, Button함수에서 parsing, validation을. 각 함수 객체가 독립적일 수 있도록
// button을 여기남기고 위에 fetch로 통신하는 부분을 api로?
async function handleSigninButton() {
    const response = await handleSignin();


    if(response.status == 200){
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
        alert("환영합니다.")
        window.location.replace(`${frontend_base_url}/`)
    }else{
        alert("회원정보가 일치하지 않습니다.")
    }
}
