import axios from 'axios';
import { TelegrafContext } from 'telegraf/typings/context';
import config from './config';
import { extraPhotoOptions } from './constants';
import { Animal, TotalNumber } from './types';

axios.defaults.baseURL = config.SHELTER_API;

export const getTotalDogs = async () => {
    const { data } = await axios.request<TotalNumber>({ url: `dogs/number` });
    return data?.total ?? 0;
};

export const getRandomDog = async () => {
    const total = await getTotalDogs();
    const index = Math.floor(Math.random() * total);
    const { data } = await axios.request<Animal>({ url: `dogs/${index}` });
    return data;
};

export const getTotalCats = async () => {
    const { data } = await axios.request<TotalNumber>({ url: `cats/number` });
    return data?.total ?? 0;
};

export const getRandomCat = async () => {
    const total = await getTotalCats();
    const index = Math.floor(Math.random() * total);
    const { data } = await axios.request<Animal>({ url: `cats/${index}` });
    return data;
};

export const getAnimalCaption = ({ name, gender, description, link }: Animal, linkText: string) =>
    `${name}, ${gender}\n\n${description}\n\n<a href="${link}">${linkText}</a>`;

export const getCatCaption = (animal: Animal) =>
    `🐱 ${getAnimalCaption(animal, 'Забрать котика')}`;
export const getDogCaption = (animal: Animal) =>
    `🐶 ${getAnimalCaption(animal, 'Забрать песика')}`;


export const replyWithAnimal = (ctx: TelegrafContext, animal: Animal, caption: string) => {
    ctx.replyWithPhoto(animal.img, { caption, ...extraPhotoOptions });
}