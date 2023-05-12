console.log('수정')
window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    sitterId = urlParams.get('sitter_id');
    if (sitterId) {
        const response = await getSitter(sitterId);
        console.log(response)
        //버튼 수정하기로 바꿔주기
        const updateButton = document.createElement("button")
        updateButton.setAttribute("class", "btn btn-dark")
        updateButton.setAttribute("type", "button")
        updateButton.setAttribute("onclick", `updateSitter(${sitterId})`)
        updateButton.innerHTML = "수정하기"
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
        const buttons = document.getElementById("post-form")
        buttons.appendChild(createButton)
    }
}