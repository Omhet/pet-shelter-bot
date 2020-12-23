import Telegraf from 'telegraf';
import config from './config';
import { getCatCaption, getRandomCat, getRandomDog } from './utils';

const bot = new Telegraf(process.env.BOT_TOKEN!);
bot.start((ctx) => {
    ctx.reply('Привет!');
});
bot.hears('С', async (ctx) => {
    const { img, name, gender, description } = await getRandomDog();
    const caption = `🐶 ${name}, ${gender}\n\n${description}`;
    ctx.replyWithPhoto(img, { caption });
});
bot.hears('К', async (ctx) => {
    const animal = await getRandomCat();
    const caption = getCatCaption(animal);
    ctx.replyWithPhoto(animal.img, { caption });
});
bot.launch();
console.log('Bot started');

const sendAnimalToMainChat = async () => {
    const animal = await getRandomCat();
    const caption = getCatCaption(animal);
    bot.telegram.sendPhoto(config.TELEGRAM_MAIN_CHAT!, animal.img, { caption });
};

sendAnimalToMainChat();
