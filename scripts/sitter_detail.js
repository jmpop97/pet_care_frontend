console.log('연결?')
let sitterId

async function submitComment() {
    const commentbox = document.getElementById("newcomment")
    const newComment = commentbox.value
    const response = await postComment(newComment, sitterId)
    commentbox.value = ''
    loadComments(sitterId)

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

async function loadComments(sitterId) {
    const response = await getComments(sitterId)
    console.log('코멘트로딩')
    console.log(response)

    const comment_list = document.getElementById("sitter_comments")
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

async function loadReviews(sitterId) {
    const response = await getSitter(sitterId)
    console.log(response.sitterreviews)

    const review_list = document.getElementById("sitter_reviews")
    let reviews = response.sitterreviews

    //리뷰만들기
    reviews.forEach(review => {
        let list_number = review_list.getElementsByTagName("li").length + 1
        let star = review.star
        let star_repeat = '⭐'.repeat(star)
        review_list.innerHTML += `
        <li class="media my-4" id="${list_number}th-review">
            <div class="media-body" >
            <h5 class="mt-0 mb-1">${review.writer} | ${star_repeat}</h5>
            <p class="margin-b">${review.content}</p>
            <p class="margin-b"><small class="text-muted">${review.created_at}</small></p>
            </div>
        </li>`
    });
}

function sitter_update(sitterId) {
    window.location.href = `${frontend_base_url}/pet_sitter_post.html?sitter_id=${sitterId}`
}

async function loadSitter(sitterId) {
    const response = await getSitter(sitterId);
    console.log(response)
    // 글 제목
    const sitterTitle = document.getElementById("sitter-title")
    sitterTitle.innerText = response.title

    // 만약 글 작성자와 동일하다면 수정/삭제 버튼 내보내기
    // const payload = localStorage.getItem("payload")
    // const payload_parse = JSON.parse(payload)
    // console.log(payload_parse.user_id)
    const updateButton = document.createElement("button")
    updateButton.setAttribute("class", "btn btn-dark mx-2 my-2")
    updateButton.setAttribute("type", "button")
    updateButton.setAttribute("onclick", `sitter_update(${sitterId})`)
    updateButton.innerHTML = "수정하기"
    const buttons = document.getElementById("buttons")
    buttons.appendChild(updateButton)
    // 삭제하기
    const deleteButton = document.createElement("button")
    deleteButton.setAttribute("class", "btn btn-dark mx-2 my-2")
    deleteButton.setAttribute("type", "button")
    deleteButton.setAttribute("onclick", `deleteSitter(${sitterId})`)
    deleteButton.innerHTML = "삭제하기"
    buttons.appendChild(deleteButton)
    // 글 작성자
    const sitterWriter = document.getElementById("sitter-writer")
    sitterWriter.innerText = response.writer
    // 예약상태
    const sitterIsReserved = document.getElementById("sitter-isreserved")
    sitterIsReserved.innerText = response.is_reserved
    if (response.is_reserved == "미완료") {
        sitterIsReserved.style.color = "red";
    } else if (response.is_reserved == "예약중") {
        sitterIsReserved.style.color = "#ff8040";
    } else if (response.is_reserved == "완료") {
        sitterIsReserved.style.color = "green";
    }
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
    await loadReviews(sitterId);
    await loadComments(sitterId);
}