import axios from 'axios';
import { Animal } from './types';

axios.defaults.baseURL = process.env.SHELTER_API;

export const getRandomDog = async () => {
    const { data } = await axios.request<Animal>({ url: 'dog/0' });
    console.log(data);
    return data;
};
