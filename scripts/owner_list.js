console.log('연결')

window.onload = async function loadOwners() {
    owners = await getOwners()
    console.log(owners)

    const owner_list = document.getElementById("owner_list")
    owners.forEach(owner => {
        const newCard = document.createElement("div")
        newCard.setAttribute("class", "card mb-3")
        newCard.setAttribute("id", owner.id)
        newCard.setAttribute("style", "max-width: 90%;")
        const newRow = document.createElement("div")
        newRow.setAttribute("class", "row g-0")
        newCard.appendChild(newRow)
        if (owner.photo != null) {
            const newImg = document.createElement("div")
            newImg.setAttribute("class", "col-md-4")
            newRow.appendChild(newImg)
            const ownerImg = document.createElement("img")
            ownerImg.setAttribute("src", `${backend_base_url}${owner.photo}`)
            ownerImg.setAttribute("class", "img-fluid rounded-start")
            newImg.appendChild(ownerImg)
        }
        // 카드 큰 틀 만들기
        const newTxt = document.createElement("div")
        newTxt.setAttribute("class", "col-md-8")
        newRow.appendChild(newTxt)
        const newCardBody = document.createElement("div")
        newCardBody.setAttribute("class", "card-body")
        newTxt.appendChild(newCardBody)
        // 내용 부분
        // 구인 상태
        const newShowStatus = document.createElement("p")
        newShowStatus.setAttribute("class", "card-text")
        newShowStatus.innerText = owner.show_status
        newCardBody.appendChild(newShowStatus)
        // 게시글 제목
        const newTitle = document.createElement("h5")
        newTitle.setAttribute("class", "card-title")
        newTitle.innerText = owner.title
        newCardBody.appendChild(newTitle)
        // 게시글 내용
        const newContent = document.createElement("p")
        newContent.setAttribute("class", "card-text")
        newContent.setAttribute("id", "content")
        newContent.innerText = owner.content
        newCardBody.appendChild(newContent)
        // 예약 날짜
        const newDateTime = document.createElement("p")
        newDateTime.setAttribute("class", "card-text text-start")
        newCardBody.appendChild(newDateTime)
        const newReserved = document.createElement("small")
        newReserved.setAttribute("class", "text-muted")
        newReserved.innerText = owner.reservation_start + ' - ' + owner.reservation_end
        newDateTime.appendChild(newReserved)
        // 가격
        const newPrice = document.createElement("p")
        newPrice.setAttribute("cass", "card-text text-end fs-4 fw-bolder")
        newPrice.innerText = '₩' + owner.charge
        newDateTime.appendChild(newPrice)




        owner_list.appendChild(newCard)
    });
}