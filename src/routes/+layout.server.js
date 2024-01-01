import * as cheerio from 'cheerio';
import axios from 'axios';
import { baseUrl, formatCard } from '$lib/utils';
export async function load() {
    const genres = [];
    const country = [];
	const { data } = await axios.get(`https://flixhq.pe`);
	const $ = cheerio.load(data);
	
}
