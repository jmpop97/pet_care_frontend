console.log('hi')
let ownerId

async function submitComment() {
    const commentbox = document.getElementById("newcomment")
    const newComment = commentbox.value
    const response = await postComment(newComment, ownerId)
    commentbox.value = ''
    loadComments(ownerId)

}

async function loadComments(ownerID) {
    const response = await getComments(ownerID)
    console.log('코멘트로딩')
    console.log(response)

    const comment_list = document.getElementById("owner_comments")
    // 로드할때 리셋
    comment_list.innerHTML = ''
    //댓글만들기
    response.forEach(comment => {
        comment_list.innerHTML += `
        <li class="media my-4">
            <div class="media-body">
            <h5 class="mt-0 mb-1">${comment.writer}</h5>
            <p class="margin-b">${comment.content}</p>
            <p><small class="text-muted">${comment.created_at}</small></p>
            </div>
        </li>`
    });
}

function owner_update(owner_id) {
    window.location.href = `${frontend_base_url}/pet_owner_post.html?owner_id=${owner_id}`
}

async function loadOwner(ownerId) {
    const response = await getOwner(ownerId);
    console.log(response)
    // 글 제목
    const ownerTitle = document.getElementById("owner-title")
    ownerTitle.innerText = response.title

    // 만약 글 작성자와 동일하다면 수정/삭제 버튼 내보내기
    // const payload = localStorage.getItem("payload")
    // const payload_parse = JSON.parse(payload)
    // console.log(payload_parse.user_id)
    const updateButton = document.createElement("button")
    updateButton.setAttribute("class", "btn btn-dark")
    updateButton.setAttribute("type", "button")
    updateButton.setAttribute("onclick", `owner_update(${ownerId})`)
    updateButton.innerHTML = "수정하기"
    const buttons = document.getElementById("buttons")
    buttons.appendChild(updateButton)
    // 글 작성자
    const ownerWriter = document.getElementById("owner-writer")
    ownerWriter.innerText = response.writer
    // 예약상태
    const ownerIsReserved = document.getElementById("owner-isreserved")
    ownerIsReserved.innerText = response.is_reserved
    // 예약날짜
    const ownerDateTime = document.getElementById("owner-datetime")
    ownerDateTime.innerText = response.reservation_start + ' - ' + response.reservation_end
    // 지역
    const ownerLocation = document.getElementById("owner-location")
    ownerLocation.innerText = response.location
    // 반려동물 종
    const ownerSpecies = document.getElementById("owner-species")
    ownerSpecies.innerText = response.species
    // 요금
    const ownerPrice = document.getElementById("owner-price")
    ownerPrice.innerText = '₩' + response.charge
    // 게시글 내용
    const ownerContent = document.getElementById("owner-content")
    ownerContent.innerText = response.content
    // 게시글 사진
    if (response.photo != null) {
        const ownerImg = document.getElementById("owner-img")
        const newImg = document.createElement("img")
        newImg.setAttribute("src", `${backend_base_url}${response.photo}`)
        newImg.setAttribute("class", "img-fluid img-thumbnail")
        ownerImg.appendChild(newImg)
    }
}

window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    ownerId = urlParams.get('owner_id');

    await loadOwner(ownerId);
    await loadComments(ownerId);


}