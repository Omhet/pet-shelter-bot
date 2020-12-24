import { Telegram } from "telegraf";
import config from "./config";
import { extraPhotoOptions } from "./constants";
import { getRandomCat, getCatCaption } from "./utils";

const sendAnimalToMainChat = async () => {
    const animal = await getRandomCat();
    const caption = getCatCaption(animal);

    console.log(`Sent animal to main chat. Link: ${animal.link}`);
    
    const telegram = new Telegram(config.BOT_TOKEN!)
    telegram.sendPhoto(config.TELEGRAM_MAIN_CHAT!, animal.img, { caption, ...extraPhotoOptions });
};

sendAnimalToMainChat();