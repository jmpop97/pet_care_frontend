console.log('수정')
window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    ownerId = urlParams.get('owner_id');
    if (ownerId) {
        const response = await getOwner(ownerId);

        //버튼 수정하기로 바꿔주기
        const updateButton = document.createElement("button")
        updateButton.setAttribute("class", "btn btn-dark")
        updateButton.setAttribute("type", "button")
        updateButton.setAttribute("onclick", `updateOwner(${ownerId})`)
        updateButton.innerHTML = "수정하기"
        updateButton.style.width = "100px"
        const buttons = document.getElementById("post-form")
        buttons.appendChild(updateButton)

        //작성된 값 넣어주기
        const title = document.getElementById("title")
        const content = document.getElementById("content")
        const charge = document.getElementById("charge")
        const location = document.getElementById("location")
        const species = document.getElementById("species")
        title.value = response.title
        content.value = response.content
        charge.value = response.charge
        location.value = response.location
        species.value = response.species


    } else {
        //버튼 작성하기로 바꿔주기
        const createButton = document.createElement("button")
        createButton.setAttribute("class", "btn btn-dark")
        createButton.setAttribute("type", "button")
        createButton.setAttribute("onclick", "postOwner()")
        createButton.innerHTML = "작성하기"
        createButton.style.width = "100px"
        const buttons = document.getElementById("post-form")
        buttons.appendChild(createButton)
    }
}