const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const weatherApiKey = '55ef5fbde2c3f490371657667fe24a24';

async function getData() {
    try {
        let response = await fetch('/all');
        return data = await response.json();
    } catch (err) {
        // catches errors both in fetch and response.json
        alert(err);
    }
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

async function getTemperatureByZip() {
    try {

        let response = await fetch(`${baseUrl}?q=${document.getElementById('zip').value}&appid=${weatherApiKey}`);
        let data = await response.json();
        return data.main.temp;
    } catch (err) {
        alert(err);
    }
};

function constructData(temp) {
    let d = new Date();
    let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
    data = {
        "temp": `${temp} Kelvin`,
        "date": newDate,
        "feelings": document.getElementById('feelings').value
    }
    return data;
}

document.getElementById('generate').addEventListener('click', () => getTemperatureByZip().then(temperature => {
    return postData('/all', constructData(temperature));
}).then(ignoredData => { // I could also just use this ignoredData to update, but rubric requires explicitly asking for those data with an async get call.
    return getData();
}).then(data => {
    document.getElementById('date').innerHTML = data.date;
    document.getElementById('temp').innerHTML = data.temp;
    document.getElementById('content').innerHTML = data.feelings;
}));

