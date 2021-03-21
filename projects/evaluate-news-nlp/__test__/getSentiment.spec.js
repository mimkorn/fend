import { getSentiment } from '../src/server/meaningCloudAPI'
import fetch from 'node-fetch'

jest.mock('node-fetch')

test("test correctness of url call with data", () => {
    getSentiment("randomdata");
    expect(fetch).toHaveBeenCalledWith("https://api.meaningcloud.com/sentiment-2.1?key=undefined&of=json&lang=en&model=general&txt=randomdata")
})
