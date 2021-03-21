async function postData(url = '', data = {}) {
    console.log(data);
    console.log(JSON.stringify(data));
    try {
        const response = await fetch(url, {
            method: 'POST',
            //credentials: 'same-origin',
            cache: 'no-cache',
            //mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
             //   'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    } catch (err) {
        alert(err)
        console.log(err)
    }
}

export { postData }