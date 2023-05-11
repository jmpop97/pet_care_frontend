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

    const response = await fetch('http://127.0.0.1:8000/owner/', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formdata
    })
    console.log(response)
}