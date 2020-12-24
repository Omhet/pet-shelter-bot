import Telegraf from "telegraf";
import config from "./config";
import { extraPhotoOptions } from "./constants";
import { getRandomDog, getDogCaption, getRandomCat, getCatCaption } from "./utils";

export const bot = new Telegraf(config.BOT_TOKEN!);
bot.launch();
console.log('Bot started');

bot.start((ctx) => {
    ctx.reply('Привет!');
});
bot.hears('С', async (ctx) => {
    const animal = await getRandomDog();
    const caption = getDogCaption(animal);
    ctx.replyWithPhoto(animal.img, { caption, ...extraPhotoOptions });
});
bot.hears('К', async (ctx) => {
    const animal = await getRandomCat();
    const caption = getCatCaption(animal);
    ctx.replyWithPhoto(animal.img, { caption, ...extraPhotoOptions });
});