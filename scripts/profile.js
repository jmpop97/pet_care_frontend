const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"


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
    console.log(mypage)


    const profileemail = document.getElementById("profileemail")
    profileemail.innerText = mypage.email

    const profileusername = document.getElementById("profileusername")
    profileusername.innerText = mypage.username

    const profilenick_name = document.getElementById("profilenick_name")
    profilenick_name.innerText = mypage.nick_name

    const profilFever = document.getElementById("fever")
    profilFever.innerText = mypage.star_rating

    let petowner_set

}
