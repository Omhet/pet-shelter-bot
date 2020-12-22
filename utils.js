const getText = (element, selector) => {
    return element.querySelector(selector).textContent.trim();
}

const getImage = (element, selector) => {
    return element.querySelector(selector).getAttribute('src');
}

module.exports = {
    getText,
    getImage
}