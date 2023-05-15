function checkSignin() {
    const payload = localStorage.getItem("payload");
    if ((!payload)) {
        window.location.replace(`${frontend_base_url}`)
    }
}

checkSignin()

async function getMypage(userId) {
    let token = localStorage.getItem("access")
    const response = await fetch(`${backend_base_url}/user/${userId}/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오는데 실패하였습니다.")
    }
}



window.onload = async function loadMypage() {
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)
    const userId = payload_parse.user_id
    mypage = await getMypage(userId)



    const profileemail = document.getElementById("profileemail")
    profileemail.innerText = mypage.email

    const profileusername = document.getElementById("profileusername")
    profileusername.innerText = mypage.username
}

async function handleProfileEdit() {
    const nick_name = document.getElementById("nick_name").value
    const check_password = document.getElementById("check_password").value
    const pass_word = document.getElementById("pass_word").value
    const pass_word2 = document.getElementById("pass_word2").value

    const response = await fetch(`${backend_base_url}/user/sign/`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({
            "nick_name": nick_name,
            "check_password": check_password,
            "pass_word": pass_word
        })
    })
    console.log(response)

    if (pass_word === pass_word2) {
        const response_json = await response.json()
        console.log(response_json)
        if (response.status == 201) {
            alert("회원정보가 수정되었습니다.")
            window.location.replace(`${frontend_base_url}/profile.html`)
        }else{
            alert(response_json.detail)
        }
    } else {
        alert("비밀번호가 다릅니다.")
    }
}