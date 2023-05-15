function checkSigninPost() {
    const payload = localStorage.getItem("payload");
    const postButton = document.getElementById("owner_post_login_check")
    if (!(payload)) {
        postButton.style.display = "none";
    }
}

checkSigninPost()


async function postOwner() {
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

    const response = await fetch(`${backend_base_url}/owner/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formdata
    })
    const response_json = await response.json()
    if (response.status == 201) {
        alert("글 작성 완료")
        window.location.replace(`${frontend_base_url}/pet_owner_list.html`)
    } else {
        alert(response_json)
    }
}

async function updateOwner(ownerID) {
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

    const response = await fetch(`${backend_base_url}/owner/${ownerID}/`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formdata
    })
    const response_json = await response.json()
    if (response.status == 200) {
        alert("글 수정 완료")
        window.location.replace(`${frontend_base_url}/pet_owner_list.html?owner_id=${ownerId}`)
    } else {
        alert(response_json)
    }
}

async function deleteOwner(ownerID) {
    let token = localStorage.getItem("access")
    const response = await fetch(`${backend_base_url}/owner/${ownerID}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    const response_json = await response.json()
    console.log(response_json)
    if (response.status == 204) {
        alert("게시글이 삭제되었습니다")
        window.location.replace(`${frontend_base_url}/pet_owner_list.html`)
    } else {
        alert(response.statusText)
    }
}

async function getOwners() {
    const response = await fetch(`${backend_base_url}/owner/`)

    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오는데 실패하였습니다.")
    }
}

async function getOwner(ownerId) {
    const response = await fetch(`${backend_base_url}/owner/${ownerId}/`)
    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오는데 실패하였습니다.")
    }
}

async function getComments(ownerId) {
    const response = await fetch(`${backend_base_url}/owner/${ownerId}/comment/`)
    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오는데 실패하였습니다.")
    }
}

async function postComment(newComment, ownerId) {
    let token = localStorage.getItem("access")
    const response = await fetch(`${backend_base_url}/owner/${ownerId}/comment/`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "content": newComment,
        })
    })
    const response_json = await response.json()
    if (response.status == 201) {
        return response_json
    } else {
        alert(response_json)
    }
}

async function updateComment(newComment, commentId) {
    let token = localStorage.getItem("access")
    const response = await fetch(`${backend_base_url}/owner/${ownerId}/comment/${commentId}/`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "content": newComment,
        })
    })
    const response_json = await response.json()
    if (response.status == 200) {
        alert("수정이 완료되었습니다")
        window.location.replace(`${frontend_base_url}/pet_owner_detail.html?owner_id=${ownerId}`)
    } else {
        alert(response.statusText)
    }
}


async function deleteComment(commentID) {
    let token = localStorage.getItem("access")
    const response = await fetch(`${backend_base_url}/owner/${ownerId}/comment/${commentID}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    if (response.status == 204) {
        alert("삭제되었습니다")
        window.location.replace(`${frontend_base_url}/pet_owner_detail.html?owner_id=${ownerId}`)
    } else {
        alert(response.statusText)
    }
}

async function reservedOwner(ownerId) {
    let token = localStorage.getItem("access")
    const response = await fetch(`${backend_base_url}/owner/${ownerId}/reservation/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    const response_json = await response.json()
    if (response.status == 200) {
        alert(response_json)
        window.location.replace(`${frontend_base_url}/pet_owner_detail.html?owner_id=${ownerId}`)
    } else {
        alert(response_json)
    }
}

async function getreservedOwner(ownerId) {
    let token = localStorage.getItem("access")
    const response = await fetch(`${backend_base_url}/owner/${ownerId}/reservation/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    const response_json = await response.json()
    return response_json
}

async function SitterIsSelected(ownerId, userId) {
    let token = localStorage.getItem("access")
    const response = await fetch(`${backend_base_url}/owner/${ownerId}/reservation/${userId}/`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    const response_json = await response.json()
    if (response.status == 200) {
        alert(response_json)
        window.location.replace(`${frontend_base_url}/pet_owner_detail.html?owner_id=${ownerId}`)
    } else {
        alert(response_json)
    }
}