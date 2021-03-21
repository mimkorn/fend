import { postData } from '../src/client/js/postData'

beforeEach(() => {
    console.log = jest.fn();
    window.alert = jest.fn();
});

test('posting empty will log an error', () => {
    postData();
    expect(console.log).toBeCalled();
    expect(window.alert).toBeCalled();
});

test('posting with malformed data will fail', () => {
    postData();
    expect(console.log).toBeCalledWith("body property was missing in data");
})