const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"


async function changePassword(){
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const email_code = document.getElementById("email_code").value
    console.log(email, password, email_code)

    const response = await fetch(`${backend_base_url}/user/changepassword/`,{
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body: JSON.stringify({
            "password":password,
            "email":email,
            "email_code":email_code
        })
    })
    if (password == "") {
        alert("비밀번호를 입력해주세요.");
        return;
      }

    if (email_code == "") {
        alert("인증번호를 입력해주세요.");
        return;
      }
    console.log(response)
}


async function sendMail(){
    const email = document.getElementById("email").value
    console.log(email)

    const response = await fetch(`${backend_base_url}/user/sendpasswordemail/`,{
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