export const selectElement = (selector, element = document) => element.querySelector(selector);

export const repeat = (count, callback) => {
    for (let index = 0; index < count; index++) {
        callback(index);
    }
};
