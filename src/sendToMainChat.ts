import Telegraf from "telegraf";
import { TelegrafContext } from "telegraf/typings/context";
import { bot } from "./bot";
import config from "./config";
import { extraPhotoOptions } from "./constants";
import { getRandomCat, getCatCaption } from "./utils";

const sendAnimalToMainChat = async (bot: Telegraf<TelegrafContext>) => {
    const animal = await getRandomCat();
    const caption = getCatCaption(animal);
    
    bot.telegram.sendPhoto(config.TELEGRAM_MAIN_CHAT!, animal.img, { caption, ...extraPhotoOptions });
};

sendAnimalToMainChat(bot);