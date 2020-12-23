import Telegraf from 'telegraf';
import { getRandomCat, getRandomDog } from './utils';

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
    const { img, name, gender, description } = await getRandomCat();
    const caption = `🐱 ${name}, ${gender}\n\n${description}`;
    ctx.replyWithPhoto(img, { caption });
});
bot.launch();
console.log('Bot started');
