const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"

window.onload = ()=>{
    console.log("로딩되었음")
}

// Signup 함수
async function handleSignup(){
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const password_check = document.getElementById("password_check").value
    const email = document.getElementById("email").value
    console.log(username, password, password_check, email)

    const response = await fetch(`${backend_base_url}/user/signup/`,{
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body: JSON.stringify({
            "username":username,
            "password":password,
            "password_check":password_check,
            "email":email
        })
    })

    if (response.status == 201) {
        alert("회원가입을 축하합니다!")
        window.location.replace(`${frontend_base_url}/user/api/token/`)
    }

    console.log(response)
}
