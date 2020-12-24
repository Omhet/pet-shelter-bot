import { Telegram } from "telegraf";
import config from "./config";
import { extraPhotoOptions } from "./constants";
import { Animal } from "./types";
import { getRandomCat, getCatCaption, getRandomDog } from "./utils";

const sendAnimalToMainChat = async (animal: Animal) => {
    const caption = getCatCaption(animal);

    console.log(`Sent animal to main chat. Link: ${animal.link}`);
    
    const telegram = new Telegram(config.BOT_TOKEN!)
    telegram.sendPhoto(config.TELEGRAM_MAIN_CHAT!, animal.img, { caption, ...extraPhotoOptions });
};

const sendAnimalsToMainChat = async () => {
    sendAnimalToMainChat(await getRandomCat());
    sendAnimalToMainChat(await getRandomDog());
}

sendAnimalsToMainChat();