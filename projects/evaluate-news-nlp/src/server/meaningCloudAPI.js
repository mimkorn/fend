//TODO try removing export keyword at the baseURL
export const baseURL = `api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&of=json&lang=en&model=general&txt=`

export async function getSentiment(data) {
    try {
        let response = await fetch(`${baseUrl}${data}`);
        let result = await response.json();
        console.log(result);
        return result;
    } catch (err) {
        alert(err);
    }
}
