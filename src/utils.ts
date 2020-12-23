import axios from 'axios';
import config from './config';
import { Animal, TotalNumber } from './types';

axios.defaults.baseURL = config.SHELTER_API;

export const getTotalDogs = async () => {
    const { data } = await axios.request<TotalNumber>({ url: `dogs/number` });
    return data?.total ?? 0;
}
export const getRandomDog = async () => {
    const total = await getTotalDogs();
    console.log(total);
    
    const index = Math.floor(Math.random() * total);
    const { data } = await axios.request<Animal>({ url: `dogs/${index}` });
    return data;
};
