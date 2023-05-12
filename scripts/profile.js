const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"


function checkSignin() {
    const payload = localStorage.getItem("payload");
    if((!payload)){
        window.location.replace(`${frontend_base_url}`)
    }
}

checkSignin()

window.onload = ()=>{
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)
    console.log(payload_parse.email)
    console.log(payload_parse.username)
    console.log(payload_parse.nick_name)
    
    
    const profileemail = document.getElementById("profileemail")
    profileemail.innerText = payload_parse.email

    const profileusername = document.getElementById("profileusername")
    profileusername.innerText = payload_parse.username

    const profilenick_name = document.getElementById("profilenick_name")
    profilenick_name.innerText = payload_parse.nick_name

}
