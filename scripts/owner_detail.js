console.log('hi')
let ownerId

async function submitComment() {
    const commentbox = document.getElementById("newcomment")
    const newComment = commentbox.value
    const response = await postComment(newComment, ownerId)
    commentbox.value = ''
    loadComments(ownerId)

}


async function handleUpdate(list_number, comment_id) {
    const comment = document.getElementById(`${list_number}th-comment`);
    const commentBody = document.getElementById(`${list_number}th-body`);
    commentBody.style.visibility = "hidden";
    const updateInput = document.createElement("div");
    updateInput.setAttribute("class", "input-group mb-3");
    const updateContentInput = document.createElement("textarea");
    updateContentInput.setAttribute("class", "form-control");
    updateContentInput.value = document.getElementById(`${list_number}th-content`).innerHTML;
    updateInput.appendChild(updateContentInput);
    const updateButton = document.createElement("button");
    updateButton.setAttribute("class", "btn btn-outline-secondary");
    updateButton.setAttribute("type", "button");
    updateButton.innerText = "수정하기";
    updateInput.appendChild(updateButton);
    comment.insertBefore(updateInput, commentBody);

    updateButton.onclick = async () => {
        const newComment = updateContentInput.value; // 수정된 값을 가져옴
        await updateComment(newComment, comment_id); // 수정된 값을 인자로 updateComment 호출
    };
}

async function loadComments(ownerID) {
    const response = await getComments(ownerID)
    console.log(response)

    const comment_list = document.getElementById("owner_comments")
    // 로드할때 리셋
    comment_list.innerHTML = ''

    //댓글만들기
    response.forEach(comment => {
        let list_number = comment_list.getElementsByTagName("li").length + 1
        comment_list.innerHTML += `
        <li class="media my-4" id="${list_number}th-comment">
            <div class="media-body"  id="${list_number}th-body">
            <h5 class="mt-0 mb-1">${comment.writer}</h5>
            <p class="margin-b" id="${list_number}th-content">${comment.content}</p>
            <p class="margin-b"><small class="text-muted">${comment.created_at}</small></p>
            <p><button class="text-muted btn" onclick="handleUpdate(${list_number},${comment.id})">수정</button>|<button class="text-muted btn" onclick="deleteComment(${comment.id})">삭제</button></p>
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
    const payload = localStorage.getItem("payload")
    const payload_parse = JSON.parse(payload)
    if (payload_parse) {
        if (payload_parse.username == response.writer) {
            const updateButton = document.createElement("button")
            updateButton.setAttribute("class", "btn btn-dark mx-2 my-2")
            updateButton.setAttribute("type", "button")
            updateButton.setAttribute("onclick", `owner_update(${ownerId})`)
            updateButton.innerHTML = "수정하기"
            const buttons = document.getElementById("buttons")
            buttons.appendChild(updateButton)
            // 삭제하기
            const deleteButton = document.createElement("button")
            deleteButton.setAttribute("class", "btn btn-dark mx-2 my-2")
            deleteButton.setAttribute("type", "button")
            deleteButton.setAttribute("onclick", `deleteOwner(${ownerId})`)
            deleteButton.innerHTML = "삭제하기"
            buttons.appendChild(deleteButton)
        }
    }
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