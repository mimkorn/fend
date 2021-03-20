function handleSubmit(event) {
    event.preventDefault()

    let formText = document.getElementById('textToAnalyze').value

    console.log("::: Form Submitted :::")
    postData('http://localhost:8080/', {data : formText})
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
    })
}
 
async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

export { handleSubmit }
