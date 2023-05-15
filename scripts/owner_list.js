console.log('연결')

function owner_detail(owner_id) {
    window.location.href = `${frontend_base_url}/pet_owner_detail.html?owner_id=${owner_id}`
}

window.onload = async function loadOwners() {
    owners = await getOwners()


    const owner_list = document.getElementById("owner_list")
    owners.forEach(owner => {
        // 카드 큰 틀
        const newCard = document.createElement("div")
        newCard.setAttribute("class", "card mb-4")
        newCard.setAttribute("id", owner.id)
        newCard.setAttribute("style", "max-width: 90%;")
        newCard.setAttribute("onclick", `owner_detail(${owner.id})`)
        const newRow = document.createElement("div")
        newRow.setAttribute("class", "row g-0")
        newCard.appendChild(newRow)
        // 카드 이미지
        if (owner.photo) {
            const newImg = document.createElement("div")
            newImg.setAttribute("class", "col-md-4")
            newRow.appendChild(newImg)
            const ownerImg = document.createElement("img")
            ownerImg.setAttribute("src", `${backend_base_url}${owner.photo}`)
            ownerImg.setAttribute("class", "cardimg rounded-start")
            newImg.appendChild(ownerImg)
        }
        // 사진이 없을 때 기본이미지를 넣을까요? 없앨까요?


        // 카드 글 부분
        const newTxt = document.createElement("div")
        newTxt.setAttribute("class", "col-md-8")
        newRow.appendChild(newTxt)
        const newCardBody = document.createElement("div")
        newCardBody.setAttribute("class", "card-body p-5")
        newTxt.appendChild(newCardBody)

        // 내용 부분
        // 구인 상태
        const newIsReserved = document.createElement("p")
        newIsReserved.setAttribute("class", "card-text")
        if (owner.is_reserved == "미완료") {
            newIsReserved.style.color = "red";
        } else if (owner.is_reserved == "예약중") {
            newIsReserved.style.color = "#ff8040";
        } else if (owner.is_reserved == "완료") {
            newIsReserved.style.color = "green";
        }
        newIsReserved.style.fontSize = "15px"
        newIsReserved.innerText = owner.is_reserved
        newCardBody.appendChild(newIsReserved)
        // 제목+작성자
        const newHead = document.createElement("div")
        newHead.setAttribute("class", "row")
        newCardBody.appendChild(newHead)
        // 게시글 제목
        const newTitle = document.createElement("h4")
        newTitle.setAttribute("class", "card-title col")
        newTitle.innerText = owner.title
        newHead.appendChild(newTitle)
        //게시글 작성자
        const newWriter = document.createElement("p")
        newWriter.setAttribute("class", "card-text col text-end")
        newWriter.innerText = owner.writer
        newHead.appendChild(newWriter)
        // 게시글 내용
        const newContent = document.createElement("p")
        newContent.setAttribute("class", "card-text margin-b")
        newContent.setAttribute("id", "content")
        newContent.style.fontSize = "17px"
        newContent.innerText = owner.content
        newCardBody.appendChild(newContent)
        // 예약 날짜
        const newDateTime = document.createElement("p")
        newDateTime.setAttribute("class", "card-text text-start margin-b")
        newCardBody.appendChild(newDateTime)
        const newReserved = document.createElement("small")
        newReserved.setAttribute("class", "text-muted")
        newReserved.innerText = owner.reservation_start + ' - ' + owner.reservation_end
        newDateTime.appendChild(newReserved)
        // 위치
        const newLocation = document.createElement("p")
        newLocation.setAttribute("class", "card-text text-start margin-b")
        newCardBody.appendChild(newLocation)
        const newPlace = document.createElement("small")
        newPlace.setAttribute("class", "text-muted")
        newPlace.innerText = owner.location
        newLocation.appendChild(newPlace)
        // 반려동물 + 요금
        const newFoot = document.createElement("div")
        newFoot.setAttribute("class", "row")
        newCardBody.appendChild(newFoot)
        // 반려동물
        const newSpecies = document.createElement("p")
        newSpecies.setAttribute("class", "card-text col")
        newFoot.appendChild(newSpecies)
        const Species = document.createElement("small")
        Species.setAttribute("class", "text-muted")
        Species.innerText = owner.species
        newSpecies.appendChild(Species)
        // 가격
        const newPrice = document.createElement("p")
        newPrice.setAttribute("class", "card-text col text-end fs-5 fw-semibold")
        newPrice.innerText = '₩' + owner.charge
        newFoot.appendChild(newPrice)




        owner_list.appendChild(newCard)
    });
}