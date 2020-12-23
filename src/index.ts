import Telegraf from 'telegraf';
import { getRandomDog } from './utils';

const bot = new Telegraf(process.env.BOT_TOKEN!);
bot.start((ctx) => {
    ctx.reply('Привет!')
});
bot.hears('С', async (ctx) => {
    const { img, name, gender, description } = await getRandomDog();
    ctx.replyWithPhoto(img);
    ctx.reply(`${name}, ${gender}\n${description}`);
});
bot.launch();
console.log('Bot started');