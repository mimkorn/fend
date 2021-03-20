function handleSubmit(event) {
    event.preventDefault()

    let formText = document.getElementById('textToAnalyze').value

    console.log("::: Form Submitted :::")
    console.log(window.location.href)
    postData(`${window.location.href}analyze`, {data : formText})
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
    })
}
 
async function postData(url = '', data = {}) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            cache: 'no-cache',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    } catch (err) {
        alert(err)
        console.log(err)
    }
}

export { handleSubmit }
