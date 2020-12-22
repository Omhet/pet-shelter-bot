import compression from 'compression';
import cors from 'cors';
import express from 'express';
import jsdom from 'jsdom';
import { getText, getImage } from './utils';

const app = express();

app.use(cors());
app.use(compression());

const { JSDOM } = jsdom;
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

    JSDOM.fromURL(`${dogsUrl}?page=${page}`, options).then((dom) => {
        const doc = dom.window.document;
        const cards = doc.querySelectorAll('.card.box');
        const card = cards[cardIndex];
        const name = getText(card, '.title h2');
        const gender = getText(card, '.title .gender');
        const description = getText(card, '.h4');
        const img = getImage(card, '.img-wrap img');

        res.json({ name, gender, description, img });
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Your app is listening on port ' + port);
});
