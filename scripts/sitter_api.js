function checkSigninPost() {
    const payload = localStorage.getItem("payload");
    const postButton = document.getElementById("sitter_post_login_check")
    if (!(payload)) {
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

    const formdata = new FormData();
    formdata.append("title", title)
    formdata.append("content", content)
    formdata.append("charge", charge)
    formdata.append("location", location)
    formdata.append("species", species)
    formdata.append("photo", photo)

    let token = localStorage.getItem("access")

    const response = await fetch(`${backend_base_url}/sitter/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formdata
    })

    const response_json = await response.json()
    if (response.status == 201) {
        alert(response_json)
        window.location.replace(`${frontend_base_url}/pet_sitter_list.html`)
    } else {
        alert(response_json)
    }
}

async function updateSitter(sitterID) {
    const title = document.getElementById('title').value
    const content = document.getElementById('content').value
    const charge = document.getElementById('charge').value
    const location = document.getElementById('location').value
    const species = document.getElementById('species').value
    const photo = document.getElementById('photo').files[0]

    const formdata = new FormData();
    formdata.append("title", title)
    formdata.append("content", content)
    formdata.append("charge", charge)
    formdata.append("location", location)
    formdata.append("species", species)
    formdata.append("photo", photo)

    let token = localStorage.getItem("access")

    const response = await fetch(`${backend_base_url}/sitter/${sitterID}/`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formdata
    })

    if (response.status == 200) {
        alert(response_json)
        window.location.replace(`${frontend_base_url}/pet_sitter_list.html?owner_id=${sitterId}`)
    } else {
        alert(response_json)
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
    const response_json = await response.json()
    alert(response_json)
    window.location.replace(`${frontend_base_url}/pet_sitter_list.html`)
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

    if (response.status == 201) {
        const response_json = await response.json()
        return response_json
    } else {
        const response_json = await response.json()
        alert(response_json)

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
    const response_json = await response.json()
    alert(response_json)
    window.location.replace(`${frontend_base_url}/pet_sitter_detail.html?sitter_id=${sitterId}`)
}

async function deleteComment(commentID) {
    let token = localStorage.getItem("access")
    const response = await fetch(`${backend_base_url}/sitter/${sitterId}/comment/${commentID}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    const response_json = await response.json()
    alert(response_json)
    window.location.replace(`${frontend_base_url}/pet_sitter_detail.html?sitter_id=${sitterId}`)
}
