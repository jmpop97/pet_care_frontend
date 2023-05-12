// navbar 버튼이 아닌 주소로 signup.html쳐서 들어갔을때 로그인상태면 redirect하는 함수
// api.js가 맨위에서 실행되어야 오류없이 실행됨
function checkSignin() {
    const payload = localStorage.getItem("payload");
    if(payload){
        window.location.replace(`${frontend_base_url}`)
    }
}

checkSignin()


// Signup 함수 fetch부분 통신만 api로 보낼 필요?
async function handleSignup(){
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const password_check = document.getElementById("password_check").value
    const email = document.getElementById("email").value
    const check_email = document.getElementById("check_email").value
    console.log(username, password, password_check, email, check_email)

    const response = await fetch(`${backend_base_url}/user/signup/`,{
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body: JSON.stringify({
            "username":username,
            "password":password,
            "email":email,
            "check_email":check_email
        })
    })
    console.log(response)

    if (password === password_check) {
        console.log(response)
    
        if (response.status == 201) {
            alert("회원가입을 축하합니다!")
            window.location.replace(`${frontend_base_url}/signin.html`)
        }

        // if (response.status == 400) {
        //     alert(`${response_message}`)
        // }
    }else{
        alert("비밀번호가 다릅니다.")
    }
}

async function sendMail(){
    const email = document.getElementById("email").value
    console.log(email)

    const response = await fetch(`${backend_base_url}/user/sendemail/`,{
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body: JSON.stringify({
            "email":email
        })
    })
    if (email == "") {
        alert("이메일을 입력해주세요.");
        return;
      }

    if (response.status == 200) {
        alert("메일을 발송했습니다.")
    }
    console.log(response)
}
