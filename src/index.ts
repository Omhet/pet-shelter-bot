import Telegraf from 'telegraf';
import { ExtraPhoto } from 'telegraf/typings/telegram-types';
import config from './config';
import { getCatCaption, getDogCaption, getRandomCat, getRandomDog } from './utils';

const extraOprions: ExtraPhoto = {
    parse_mode: 'HTML'
}

const bot = new Telegraf(process.env.BOT_TOKEN!);
bot.start((ctx) => {
    ctx.reply('Привет!');
});
bot.hears('С', async (ctx) => {
    const animal = await getRandomDog();
    const caption = getDogCaption(animal);
    ctx.replyWithPhoto(animal.img, { caption, ...extraOprions });
});
bot.hears('К', async (ctx) => {
    const animal = await getRandomCat();
    const caption = getCatCaption(animal);
    ctx.replyWithPhoto(animal.img, { caption, ...extraOprions });
});
bot.launch();
console.log('Bot started');

const sendAnimalToMainChat = async () => {
    const animal = await getRandomCat();
    const caption = getCatCaption(animal);
    
    bot.telegram.sendPhoto(config.TELEGRAM_MAIN_CHAT!, animal.img, { caption, ...extraOprions });
};

sendAnimalToMainChat();
