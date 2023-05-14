function checkSigninPost() {
    const payload = localStorage.getItem("payload");
    const postButton = document.getElementById("sitter_post_login_check")
    if(!(payload)){
        postButton.style.display = "none";
    }
}

checkSigninPost()


async function postSitter() {
    const title = document.getElementById('title').value
    const content = document.getElementById('content').value
    const charge = document.getElementById('charge').value
    const location = document.getElementById('location').value
    const species = document.getElementById('species').value
    const photo = document.getElementById('photo').files[0]
    const reservation_start = document.getElementById('reservation_start').value
    const reservation_end = document.getElementById('reservation_end').value

    const formdata = new FormData();
    formdata.append("title", title)
    formdata.append("content", content)
    formdata.append("charge", charge)
    formdata.append("location", location)
    formdata.append("species", species)
    formdata.append("photo", photo)
    formdata.append("reservation_start", reservation_start)
    formdata.append("reservation_end", reservation_end)

    let token = localStorage.getItem("access")

    const response = await fetch(`${backend_base_url}/sitter/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formdata
    })
    console.log(response)
    if (response.status == 201) {
        alert("글 작성 완료!")
        window.location.replace(`${frontend_base_url}/pet_sitter_list.html`)
    } else {
        alert(response.statusText)
    }
}

async function updateSitter(sitterID) {
    const title = document.getElementById('title').value
    const content = document.getElementById('content').value
    const charge = document.getElementById('charge').value
    const location = document.getElementById('location').value
    const species = document.getElementById('species').value
    const photo = document.getElementById('photo').files[0]
    const reservation_start = document.getElementById('reservation_start').value
    const reservation_end = document.getElementById('reservation_end').value

    const formdata = new FormData();
    formdata.append("title", title)
    formdata.append("content", content)
    formdata.append("charge", charge)
    formdata.append("location", location)
    formdata.append("species", species)
    formdata.append("photo", photo)
    formdata.append("reservation_start", reservation_start)
    formdata.append("reservation_end", reservation_end)

    let token = localStorage.getItem("access")

    const response = await fetch(`${backend_base_url}/sitter/${sitterID}/`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formdata
    })
    console.log(response)
    if (response.status == 200) {
        alert("글 수정 완료!")
        window.location.replace(`${frontend_base_url}/pet_sitter_list.html?owner_id=${sitterId}`)
    } else {
        alert(response.statusText)
    }
}

async function deleteSitter(sitterID) {
    let token = localStorage.getItem("access")
    const response = await fetch(`${backend_base_url}/sitter/${sitterID}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    if (response.status == 204) {
        alert("글 삭제 완료!")
        window.location.replace(`${frontend_base_url}/pet_sitter_list.html`)
    } else {
        alert(response.statusText)
    }
}

async function getSitters() {
    const response = await fetch(`${backend_base_url}/sitter/`)

    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오는데 실패하였습니다.")
    }
}

async function getSitter(sitterId) {
    const response = await fetch(`${backend_base_url}/sitter/${sitterId}/`)
    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오는데 실패하였습니다.")
    }
}

async function getComments(sitterId) {
    const response = await fetch(`${backend_base_url}/sitter/${sitterId}/comment/`)
    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오는데 실패하였습니다.")
    }
}

async function postComment(newComment, sitterId) {
    let token = localStorage.getItem("access")
    const response = await fetch(`${backend_base_url}/sitter/${sitterId}/comment/`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "content": newComment,
        })
    })
    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert(response.statusText)
    }
}

async function updateComment(newComment, commentId) {
    let token = localStorage.getItem("access")
    const response = await fetch(`${backend_base_url}/sitter/${sitterId}/comment/${commentId}/`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "content": newComment,
        })
    })
    if (response.status == 200) {
        alert(response.statusText)
        window.location.replace(`${frontend_base_url}/pet_sitter_detail.html?sitter_id=${sitterId}`)
    } else {
        alert(response.statusText)
    }
}

async function deleteComment(commentID) {
    let token = localStorage.getItem("access")
    const response = await fetch(`${backend_base_url}/sitter/${sitterId}/comment/${commentID}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    if (response.status == 204) {
        alert("댓글 삭제 완료!")
        window.location.replace(`${frontend_base_url}/pet_sitter_detail.html?sitter_id=${sitterId}`)
    } else {
        alert(response.statusText)
    }
}
