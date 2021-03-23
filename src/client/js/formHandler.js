import { postData } from './postData'

const htmlValidatingExpression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
const htmlValidatingRegex = new RegExp(htmlValidatingExpression);

function handleSubmit(event) {
    event.preventDefault()

    let formText = document.getElementById('textToAnalyze').value
    if (!formText){
        alert("Seems like you didn't put any text value into the input field. Please provide input for analysis.")
        return;
    } else if (!formText.match(htmlValidatingRegex)){
        alert("Please provide a valid URI.")
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
