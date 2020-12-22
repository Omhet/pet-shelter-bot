"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const jsdom_1 = __importDefault(require("jsdom"));
const utils_1 = require("./utils");
const app = express_1.default();
app.use(cors_1.default());
app.use(compression_1.default());
const { JSDOM } = jsdom_1.default;
const dogsUrl = 'https://izpriuta.ru/sobaki';
const showcaseUrl = 'https://izpriuta.ru/koshki';
const options = {
    referrer: 'https://example.com/',
};
app.get('/dog/:index', (req, res) => {
    const index = Number(req.params.index);
    const cardsOnPage = 9;
    const page = Math.floor(index / cardsOnPage);
    const cardIndex = index % cardsOnPage;
    console.log(page, cardIndex);
    JSDOM.fromURL(`${dogsUrl}?page=${page}`, options).then((dom) => {
        const doc = dom.window.document;
        const cards = doc.querySelectorAll('.card.box');
        const card = cards[cardIndex];
        const name = utils_1.getText(card, '.title h2');
        const gender = utils_1.getText(card, '.title .gender');
        const description = utils_1.getText(card, '.h4');
        const img = utils_1.getImage(card, '.img-wrap img');
        res.json({ name, gender, description, img });
    });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Your app is listening on port ' + port);
});
