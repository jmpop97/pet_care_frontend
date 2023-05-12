window.onload = ()=>{
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)
    console.log(payload_parse.email)
    console.log(payload_parse.username)
    console.log(payload_parse.nick_name)
    
    
    const profileemail = document.getElementById("profileemail")
    profileemail.innerText = payload_parse.profileemail

    const profileusername = document.getElementById("profileusername")
    profileusername.innerText = payload_parse.profileusername

    const profilenick_name = document.getElementById("profilenick_name")
    profilenick_name.innerText = payload_parse.profilenick_name

}
