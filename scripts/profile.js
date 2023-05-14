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

    //오너 리뷰만들기
    const ownerreview_list = document.getElementById("owner_reviews")
    let reviews = mypage.ownerreviews

    //리뷰만들기
    reviews.forEach(review => {
        let list_number = ownerreview_list.getElementsByTagName("li").length + 1
        let star = review.star
        let star_repeat = '⭐'.repeat(star)
        ownerreview_list.innerHTML += `
        <li class="media my-4 p-4 border" id="${list_number}th-review">
            <div class="media-body">
            <h5 class="mt-0 mb-1">${review.writer} | ${star_repeat}</h5>
            <p class="margin-b">${review.content}</p>
            <p class="margin-b"><small class="text-muted">${review.created_at}</small></p>
            </div>
        </li>`
    });

    //시터 리뷰만들기
    const sitterreview_list = document.getElementById("sitter_reviews")
    let sitterreviews = mypage.sitterreviews

    sitterreviews.forEach(review => {
        let list_number = sitterreview_list.getElementsByTagName("li").length + 1
        let star = review.star
        let star_repeat = '⭐'.repeat(star)
        sitterreview_list.innerHTML += `
        <li class="media my-4 p-4 border" id="${list_number}th-review">
            <div class="media-body" >
            <h5 class="mt-0 mb-1">${review.writer} | ${star_repeat}</h5>
            <p class="margin-b">${review.content}</p>
            <p class="margin-b"><small class="text-muted">${review.created_at}</small></p>
            </div>
        </li>`
    });

}
