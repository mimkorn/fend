import { postData } from './postData'

function handleSubmit(event) {
    event.preventDefault()

    let formText = document.getElementById('textToAnalyze').value
    if (!formText){
        alert("Seems like you didn't put any text value into the input field. Please provide input for analysis.")
        return;
    }
    postData(`http://localhost:8081/analyze`, {body : formText})
    .then(function(res) {
        console.log(res)
        document.getElementById('results').innerHTML = ""
        document.getElementById('results').appendChild(generateListOfAttributes(res))
    })
}

function generateListOfAttributes(data) {
    let items = document.createElement("ul")
    addDataPoint(items, "agreement", data)
    addDataPoint(items, "confidence", data)
    addDataPoint(items, "irony", data)
    return items;
}

function addDataPoint(list, attribute, data){
    let dataPoint = list.appendChild(document.createElement("li"));
    dataPoint.innerHTML = `${attribute} is ${data[attribute]}`;
}
export { handleSubmit }
