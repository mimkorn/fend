const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../src/client/views/index.html'), 'utf8');
const event = { preventDefault: () => {} };

jest.dontMock('fs');

import { handleSubmit } from '../src/client/js/formHandler'
import * as postDataFn from '../src/client/js/postData'

jest.mock('../src/client/js/postData')

beforeEach(() => {
    console.log = jest.fn();
    window.alert = jest.fn();
    document.documentElement.innerHTML = html.toString();
});

test('check prevent default is called', () => {
    jest.spyOn(event, 'preventDefault')
    handleSubmit(event)
    expect(event.preventDefault).toBeCalled()
});

test('alert on empty input field', () => {
    document.getElementById("textToAnalyze").value = "";
    handleSubmit(event)
    expect(window.alert).toBeCalledWith("Seems like you didn't put any text value into the input field. Please provide input for analysis.");
});

test('expect postData called with correct data', () => {
    document.getElementById("textToAnalyze").value = "dummyData"
    postDataFn.postData.mockImplementation((url, data) => Promise.resolve({someResponse: 1}))
    handleSubmit(event)    
    expect(postDataFn.postData).toBeCalledWith(`http://[::]:8081/analyze`, {body : "dummyData"})
    expect(document.getElementById('results').innerHTML == "{someResponse:1}")
});
