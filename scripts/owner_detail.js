console.log('hi')

window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const ownerId = urlParams.get('owner_id');

    const response = await getOwner(ownerId);
    console.log(response)
    // 글 제목
    const ownerTitle = document.getElementById("owner-title")
    ownerTitle.innerText = response.title
    // 예약상태
    const ownerIsReserved = document.getElementById("owner-isreserved")
    ownerIsReserved.innerText = response.is_reserved
    // 예약날짜
    const ownerDateTime = document.getElementById("owner-datetime")
    ownerDateTime.innerText = response.reservation_start + ' - ' + response.reservation_end
    // 지역
    const ownerLocation = document.getElementById("owner-location")
    ownerLocation.innerText = response.location
    // 요금
    const ownerPrice = document.getElementById("owner-price")
    ownerPrice.innerText = '₩' + response.charge
    // 게시글 내용
    const ownerContent = document.getElementById("owner-content")
    ownerContent.innerText = response.content
    // 게시글 사진
    if (response.photo) {
        const ownerImg = document.getElementById("owner-img")
        const newImg = document.createElement("img")
        newImg.setAttribute("src", `${backend_base_url}${response.photo}`)
        newImg.setAttribute("class", "img-fluid img-thumbnail")
        ownerImg.appendChild(newImg)
    }
}