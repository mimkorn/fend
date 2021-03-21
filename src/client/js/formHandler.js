import { postData } from './postData'

function handleSubmit(event) {
    event.preventDefault()

    let formText = document.getElementById('textToAnalyze').value
    if (!formText){
        alert("Seems like you didn't put any text value into the input field. Please provide input for analysis.")
        return;
    }
    postData(`http://[::]:8081/analyze`, {body : formText})
    .then(function(res) {
        document.getElementById('results').innerHTML = JSON.stringify(res)
    })
}

export { handleSubmit }
