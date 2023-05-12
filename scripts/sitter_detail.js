console.log('연결?')
let sitterId

async function submitComment() {
    const commentbox = document.getElementById("newcomment")
    const newComment = commentbox.value
    const response = await postComment(newComment, sitterId)
    commentbox.value = ''
    loadComments(sitterId)

}

async function loadComments(sitterId) {
    const response = await getComments(sitterId)
    console.log('코멘트로딩')
    console.log(response)

    const comment_list = document.getElementById("sitter_comments")
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

async function loadSitter(sitterId) {
    const response = await getSitter(sitterId);
    console.log(response)
    // 글 제목
    const sitterTitle = document.getElementById("sitter-title")
    sitterTitle.innerText = response.title
    // 글 작성자
    const sitterWriter = document.getElementById("sitter-writer")
    sitterWriter.innerText = response.writer
    // 예약상태
    const sitterIsReserved = document.getElementById("sitter-isreserved")
    sitterIsReserved.innerText = response.is_reserved
    // 예약날짜
    const sitterDateTime = document.getElementById("sitter-datetime")
    sitterDateTime.innerText = response.reservation_start + ' - ' + response.reservation_end
    // 지역
    const sitterLocation = document.getElementById("sitter-location")
    sitterLocation.innerText = response.location
    // 반려동물 종
    const sitterSpecies = document.getElementById("sitter-species")
    sitterSpecies.innerText = response.species
    // 요금
    const sitterPrice = document.getElementById("sitter-price")
    sitterPrice.innerText = '₩' + response.charge
    // 게시글 내용
    const sitterContent = document.getElementById("sitter-content")
    sitterContent.innerText = response.content
    // 게시글 사진
    if (response.photo != null) {
        const sitterImg = document.getElementById("sitter-img")
        const newImg = document.createElement("img")
        newImg.setAttribute("src", `${backend_base_url}${response.photo}`)
        newImg.setAttribute("class", "img-fluid img-thumbnail")
        sitterImg.appendChild(newImg)
    }
}

window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    sitterId = urlParams.get('sitter_id');

    await loadSitter(sitterId);
    await loadComments(sitterId);
}